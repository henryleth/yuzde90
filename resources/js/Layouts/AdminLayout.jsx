import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    Home, Package, Settings, Users, ChevronLeft, ChevronRight, Menu, FileText, 
    Image as ImageIcon, MapPin, PlusCircle, LayoutDashboard 
} from 'lucide-react';

// Shadcn UI Components
import { Button } from '@/Components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/Components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { 
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, 
    DropdownMenuSeparator, DropdownMenuTrigger 
} from '@/Components/ui/dropdown-menu';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/Components/ui/toaster';

export default function AdminLayout({ header, children, actionButton }) {
    const { auth, flash } = usePage().props;
    const user = auth.user; // user ya nesnedir ya da null
    const { toast } = useToast();

    useEffect(() => {
        if (flash?.success) {
            toast({
                title: "Başarılı!",
                description: flash.success,
                className: 'bg-green-600 text-white border-green-600',
            });
        }
        if (flash?.error) {
            toast({
                title: "Hata!",
                description: flash.error,
                variant: "destructive",
            });
        }
    }, [flash, toast]);

    const navLinks = [
        { name: 'Dashboard', href: route('admin.dashboard'), activeCheck: 'admin.dashboard', permission: 'view-dashboard' },
        { name: 'Turlar', href: route('admin.tours.index'), activeCheck: 'admin.tours.', permission: 'tour-management' },
        { name: 'İçerikler', href: route('admin.contents.index'), activeCheck: 'admin.contents.', permission: 'content-management' },
        { name: 'Destinasyonlar', href: route('admin.destinations.index'), activeCheck: 'admin.destinations.', permission: 'destination-management' },
        {
            name: 'Kullanıcı Yönetimi',
            permission: ['user-management', 'role-management'], // Birden fazla yetki kontrolü
            subLinks: [
                { name: 'Kullanıcılar', href: route('admin.users.index'), activeCheck: 'admin.users.', permission: 'user-management' },
                { name: 'Roller', href: route('admin.roles.index'), activeCheck: 'admin.roles.', permission: 'role-management' },
            ]
        },
        { name: 'Ayarlar', href: route('admin.settings.index'), activeCheck: 'admin.settings.', permission: 'settings-management' },
    ];

    const NavLinksContent = ({ isMobile = false }) => {
        const { auth } = usePage().props;
        const { url } = usePage();
        const userPermissions = auth.user?.permissions || [];
        const userRoles = auth.user?.roles?.map(role => role.name) || [];
        const isAdmin = userRoles.includes('Admin');
        const currentPath = url ? url.split('?')[0] : '';

        const hasPermission = (permission) => {
            if (isAdmin) return true;
            if (Array.isArray(permission)) {
                return permission.some(p => userPermissions.includes(p));
            }
            return userPermissions.includes(permission);
        };

        return navLinks
            .filter(link => hasPermission(link.permission))
            .map((link) => {
                if (link.subLinks) {
                    // Alt linkleri olan menü öğesi (Dropdown veya Accordion)
                    if (isMobile) {
                        return (
                            <Accordion type="single" collapsible key={link.name}>
                                <AccordionItem value={link.name} className="border-none">
                                    <AccordionTrigger className="text-lg font-medium hover:no-underline">{link.name}</AccordionTrigger>
                                    <AccordionContent className="pl-4">
                                        {link.subLinks.filter(subLink => hasPermission(subLink.permission)).map(subLink => (
                                            <Link key={subLink.name} href={subLink.href} className="block py-2 text-muted-foreground hover:text-foreground">{subLink.name}</Link>
                                        ))}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        );
                    }
                    return (
                        <DropdownMenu key={link.name}>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="text-sm font-medium text-muted-foreground hover:text-foreground px-0">{link.name}</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {link.subLinks.filter(subLink => hasPermission(subLink.permission)).map(subLink => (
                                    <DropdownMenuItem key={subLink.name} asChild>
                                        <Link href={subLink.href}>{subLink.name}</Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    );
                }

                // Normal link
                let isActive = false;
                try {
                    const linkUrl = new URL(link.href);
                    const linkPath = linkUrl.pathname;
                    isActive = currentPath.startsWith(linkPath);
                } catch (e) {}

                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={`transition-colors hover:text-foreground ${isActive ? 'text-foreground' : 'text-muted-foreground'} ${isMobile ? 'text-lg' : 'text-sm font-medium'}`}
                    >
                        {link.name}
                    </Link>
                );
            });
    };

    return (
        <div className="admin-panel min-h-screen w-full bg-muted/40">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <header className="z-30 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 sm:px-0">
                    <div className="flex items-center gap-6">
                        <Link href={route('admin.dashboard')} className="flex items-center gap-2 font-bold">
                            <Package className="h-6 w-6" />
                            <span className="hidden sm:inline-block">Tur10 Panel</span>
                        </Link>
                        <nav className="hidden md:flex md:items-center md:gap-5">
                            <NavLinksContent />
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button size="icon" variant="outline" className="md:hidden">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Menüyü Aç</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left">
                                <nav className="grid gap-6 text-lg font-medium mt-6">
                                    <Link href={route('admin.dashboard')} className="flex items-center gap-2 font-bold mb-4">
                                        <Package className="h-6 w-6" />
                                        <span>Turquiana Panel</span>
                                    </Link>
                                    <NavLinksContent isMobile={true} />
                                </nav>
                            </SheetContent>
                        </Sheet>
                        
                        {user && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src={`https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&background=random`} alt={user.name} />
                                            <AvatarFallback>{user.name?.charAt(0).toUpperCase() || '?'}</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuLabel>
                                        <p className="font-medium">{user.name}</p>
                                        <p className="text-xs text-muted-foreground">{user.email}</p>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href={route('admin.logout')} method="post" as="button" className="w-full text-left">
                                            Çıkış Yap
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                </header>

                <main className="py-6">
                    <div className="flex items-center justify-between mb-6">
                        {header && <div className="text-2xl font-bold tracking-tight">{header}</div>}
                        {actionButton && <div>{actionButton}</div>}
                    </div>
                    {children}
                </main>
            </div>
            <Toaster />
        </div>
    );
}
