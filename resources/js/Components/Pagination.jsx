import { Link } from '@inertiajs/react';
import React from 'react';

export default function Pagination({ links }) {
    function getClassName(active) {
        if (active) {
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-primary-500 focus:text-primary-500 bg-white shadow-md text-primary-500";
        } else {
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-primary-500 focus:text-primary-500";
        }
    }

    return (
        <div className="flex flex-wrap -mb-1">
            {links.map((link, key) => (
                link.url === null ?
                    (<div
                        className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded"
                        key={key}
                        dangerouslySetInnerHTML={{ __html: link.label }} // HTML olarak render etmek için
                    ></div>) // İçerik div'in içine taşındı
                    :
                    (<Link
                        className={getClassName(link.active)}
                        href={link.url}
                        key={key}
                        dangerouslySetInnerHTML={{ __html: link.label }} // HTML olarak render etmek için
                    ></Link>) // İçerik Link'in içine taşındı
            ))}
        </div>
    );
}