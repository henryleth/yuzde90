<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class BookingController extends Controller
{
    /**
     * Rezervasyon talebini işle ve email gönder
     */
    public function store(Request $request)
    {
        // Form verilerini doğrula
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'tour_date' => 'required|string|max:255',
            'participants' => 'required|integer|min:1|max:50',
            'country' => 'required|string|max:10',
            'whatsapp' => 'nullable|string|max:20',
            'message' => 'nullable|string|max:2000',
            'tour_id' => 'required|integer',
            'tour_title' => 'required|string|max:255',
            'recaptcha_token' => 'required|string',
        ]);

        if ($validator->fails()) {
            Log::warning('Booking validation failed', [
                'errors' => $validator->errors(),
                'request_data' => $request->all()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Geçersiz form verileri.',
                'errors' => $validator->errors()
            ], 422);
        }

        // reCAPTCHA kontrolü
        if (!$this->verifyRecaptcha($request->recaptcha_token)) {
            return response()->json([
                'success' => false,
                'message' => 'reCAPTCHA doğrulaması başarısız.'
            ], 422);
        }

        try {
            // Email gönderimi
            $this->sendBookingEmail($request->all());

            // Log kayıt
            Log::info('Booking request received', [
                'name' => $request->name,
                'email' => $request->email,
                'tour_id' => $request->tour_id,
                'tour_title' => $request->tour_title,
                'participants' => $request->participants,
                'country' => $request->country,
                'ip' => $request->ip()
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Rezervasyon talebiniz başarıyla gönderildi.'
            ]);

        } catch (\Exception $e) {
            Log::error('Booking email send failed', [
                'error' => $e->getMessage(),
                'request_data' => $request->all()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Email gönderiminde hata oluştu.'
            ], 500);
        }
    }

    /**
     * reCAPTCHA token'ını doğrula
     * @param string $token
     */
    private function verifyRecaptcha($token)
    {
        // Development bypass
        if ($token === 'no_recaptcha' || $token === 'development_bypass') {
            return true;
        }
        
        // Token boş ise hata
        if (empty($token)) {
            return false;
        }
        
        try {
            $secretKey = env('RECAPTCHA_SECRET_KEY');
            
            $response = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
                'secret' => $secretKey,
                'response' => $token
            ]);

            $result = $response->json();
            
            return ($result['success'] ?? false);
            
        } catch (\Exception $e) {
            Log::error('reCAPTCHA verification failed', ['error' => $e->getMessage()]);
            return false;
        }
    }

    /**
     * Rezervasyon email'ini gönder
     */
    private function sendBookingEmail($data)
    {
        // Email içeriği (İspanyolca)
        $emailContent = "
        <h2>🎯 Nueva Solicitud de Reserva</h2>
        
        <h3>📋 Información del Cliente:</h3>
        <ul>
            <li><strong>Nombre:</strong> {$data['name']}</li>
            <li><strong>Email:</strong> {$data['email']}</li>
            <li><strong>País:</strong> {$data['country']}</li>
            <li><strong>WhatsApp:</strong> " . ($data['whatsapp'] ?: 'No especificado') . "</li>
        </ul>
        
        <h3>🗓️ Información del Tour:</h3>
        <ul>
            <li><strong>Tour:</strong> {$data['tour_title']} (ID: {$data['tour_id']})</li>
            <li><strong>Fecha:</strong> {$data['tour_date']}</li>
            <li><strong>Número de Participantes:</strong> {$data['participants']} personas</li>
        </ul>
        
        <h3>💬 Mensaje:</h3>
        <p>" . ($data['message'] ? nl2br(htmlspecialchars($data['message'])) : 'No se especificó mensaje.') . "</p>
        
        <hr>
        <p><small>Este email fue enviado automáticamente. Fecha: " . now()->format('d.m.Y H:i') . "</small></p>
        ";

        // Email gönder (birden fazla adrese gönderilebilir)
        $bookingEmails = explode(',', env('BOOKING_EMAILS', 'info@turquiana.com'));
        
        // Güvenlik kontrolü - boş email'leri filtrele
        $bookingEmails = array_filter(array_map('trim', $bookingEmails), function($email) {
            return !empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL);
        });
        
        if (empty($bookingEmails)) {
            $bookingEmails = ['info@turquiana.com']; // Fallback
        }
        
        Mail::html($emailContent, function ($message) use ($data, $bookingEmails) {
            foreach ($bookingEmails as $email) {
                $message->to(trim($email));
            }
            $message->subject('🎯 Nueva Solicitud de Reserva - ' . $data['tour_title'])
                    ->from(env('MAIL_FROM_ADDRESS', 'info@turquiana.com'), env('MAIL_FROM_NAME', 'Turquiana'))
                    ->replyTo($data['email'] ?: 'noreply@turquiana.com', $data['name'] ?: 'Cliente');
        });

        // Müşteriye otomatik yanıt gönder (şimdilik disabled)
        // $this->sendCustomerConfirmation($data);
    }

    /**
     * Müşteriye otomatik onay email'i gönder
     */
    private function sendCustomerConfirmation($data)
    {
        $confirmationContent = "
        <h2>✅ Su Solicitud de Reserva ha sido Recibida</h2>
        
        <p>Hola <strong>{$data['name']}</strong>,</p>
        
        <p>Su solicitud de reserva ha sido recibida exitosamente. Le responderemos lo antes posible.</p>
        
        <h3>📋 Resumen de la Solicitud:</h3>
        <ul>
            <li><strong>Tour:</strong> {$data['tour_title']}</li>
            <li><strong>Fecha:</strong> {$data['tour_date']}</li>
            <li><strong>Participantes:</strong> {$data['participants']} personas</li>
        </ul>
        
        <p>Para cualquier pregunta, puede contactarnos:</p>
        <ul>
            <li>📧 Email: info@turquiana.com</li>
            <li>📱 WhatsApp: +90 555 123 45 67</li>
        </ul>
        
        <p>Gracias,<br>
        <strong>Equipo Turquiana</strong></p>
        
        <hr>
        <p><small>Este es un mensaje automático. Por favor, no responda.</small></p>
        ";

        Mail::html($confirmationContent, function ($message) use ($data) {
            $message->to($data['email'], $data['name'])
                    ->subject('✅ Su Solicitud de Reserva ha sido Recibida - Turquiana')
                    ->from(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'));
        });
    }
}