import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import React__default, { createContext, useState, useEffect, useContext, useRef, lazy, Suspense, forwardRef, useImperativeHandle } from "react";
import { usePage, Link, Head, useForm, router as router$1, createInertiaApp } from "@inertiajs/react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { X, ChevronDown, MenuIcon, Facebook, Twitter, Instagram, Linkedin, Send, Heart, Compass, Users, Check, Leaf, Camera, ChevronRight, Dot, Package, Menu, Code, Trash2, ChevronUp, XCircle, Upload, Search, ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon, CalendarIcon, ImageIcon, PlusCircle, Edit as Edit$5, CheckCircle, Clock, MoreHorizontal, ExternalLink, Image, Lightbulb, Phone, Mail, MapPin, Star, ArrowLeft, ArrowRight } from "lucide-react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as ToastPrimitives from "@radix-ui/react-toast";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Command as Command$1 } from "cmdk";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { format } from "date-fns";
import { getDefaultClassNames, DayPicker } from "react-day-picker";
import axios from "axios";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import moment from "moment";
import "moment/locale/tr.js";
import LazyLoadImagePkg from "react-lazy-load-image-component";
import { Transition, Dialog as Dialog$1, TransitionChild, DialogPanel } from "@headlessui/react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Lightbox from "yet-another-react-lightbox";
import ReactDOMServer from "react-dom/server";
import require$$0 from "process";
import require$$1 from "http";
import { stringify, parse } from "qs";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      className: cn(buttonVariants({ variant, size, className })),
      ref,
      ...props
    }
  );
});
Button.displayName = "Button";
const ThemeContext = createContext();
const useTheme = () => useContext(ThemeContext);
const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentFont, setCurrentFont] = useState("inter");
  const [showFontMenu, setShowFontMenu] = useState(false);
  const [isHeaderShrunk, setHeaderShrunk] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const fonts = {
    inter: { name: "Inter", class: "font-inter" },
    poppins: { name: "Poppins", class: "font-poppins" },
    outfit: { name: "Outfit", class: "font-outfit" },
    spaceGrotesk: { name: "Space Grotesk", class: "font-space-grotesk" }
  };
  useEffect(() => {
    setIsMounted(true);
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
    const savedFont = localStorage.getItem("currentFont") || "inter";
    setCurrentFont(savedFont);
  }, []);
  useEffect(() => {
    if (!isMounted) return;
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode, isMounted]);
  useEffect(() => {
    if (!isMounted) return;
    Object.values(fonts).forEach((font) => {
      document.documentElement.classList.remove(font.class);
    });
    document.documentElement.classList.add(fonts[currentFont].class);
    localStorage.setItem("currentFont", currentFont);
    document.documentElement.style.setProperty("--site-font-family", fonts[currentFont].name + ", sans-serif");
  }, [currentFont, isMounted]);
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };
  const changeFont = (fontKey) => {
    setCurrentFont(fontKey);
    setShowFontMenu(false);
  };
  const value = {
    darkMode,
    toggleDarkMode,
    currentFont,
    changeFont,
    fonts,
    showFontMenu,
    setShowFontMenu,
    isHeaderShrunk,
    setHeaderShrunk
  };
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value, children });
};
const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetPortal = SheetPrimitive.Portal;
const SheetOverlay = React.forwardRef(({
  className,
  ...props
}, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = React.forwardRef(({
  side = "right",
  className,
  children,
  ...props
}, ref) => /* @__PURE__ */ jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxs(
    SheetPrimitive.Content,
    {
      ref,
      className: cn(sheetVariants({ side }), className),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(
          SheetPrimitive.Close,
          {
            className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
            children: [
              /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
            ]
          }
        )
      ]
    }
  )
] }));
SheetContent.displayName = SheetPrimitive.Content.displayName;
const SheetHeader = ({ className, ...props }) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    ),
    ...props
  }
);
SheetHeader.displayName = "SheetHeader";
const SheetTitle = React.forwardRef(({
  className,
  ...props
}, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;
const SheetDescription = React.forwardRef(({
  className,
  ...props
}, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;
const getPathname = (href) => {
  if (typeof href !== "string" || href.trim() === "") {
    return "#";
  }
  if (href.trim() === "#") {
    return "#";
  }
  if (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("//")) {
    try {
      return new URL(href).pathname;
    } catch (error) {
      return "/";
    }
  }
  return href;
};
function Header() {
  const { darkMode, toggleDarkMode, currentFont, changeFont, fonts, showFontMenu, setShowFontMenu, isHeaderShrunk } = useTheme();
  const { url } = usePage();
  const navLinks = [
    { href: route("home"), label: "Ana Sayfa" },
    { href: route("tours.index"), label: "Turlar" },
    { href: route("destinations.index"), label: "Destinasyonlar" },
    { href: route("contents.index"), label: "Blog" },
    { href: route("about.us"), label: "Hakkımızda" },
    { href: route("contact.us"), label: "İletişim" }
  ];
  return /* @__PURE__ */ jsx("header", { className: `sticky top-0 z-50 w-full border-b border-border ${darkMode ? "bg-black/80" : "bg-white/80"} backdrop-blur-sm transition-all duration-300 ${isHeaderShrunk ? "h-10" : "h-16"}`, children: /* @__PURE__ */ jsxs("div", { className: "container max-w-6xl mx-auto px-4 flex items-center justify-between h-full", children: [
    /* @__PURE__ */ jsx("div", { className: `flex-shrink-0 transition-all duration-300 ${isHeaderShrunk ? "scale-90" : "scale-100"}`, children: /* @__PURE__ */ jsx(Link, { href: route("home"), children: /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold font-playfair text-primary", children: "Tur10" }) }) }),
    /* @__PURE__ */ jsx("nav", { className: "hidden md:flex group flex-grow justify-center items-center space-x-8", children: navLinks.map((link) => {
      const linkPath = getPathname(link.href);
      const isActive = linkPath === "/" && url === "/" || linkPath !== "/" && url.startsWith(linkPath);
      return /* @__PURE__ */ jsxs(
        Link,
        {
          href: link.href,
          className: "relative group/item text-lg font-medium transition-colors hover:text-primary",
          children: [
            link.label,
            /* @__PURE__ */ jsx(
              "span",
              {
                className: `absolute -bottom-2 left-0 w-full h-0.5 bg-primary transform transition-transform duration-300 ease-out
                    ${isActive ? "scale-x-100" : "scale-x-0"}
                    ${!isActive ? "group-hover/item:scale-x-100" : ""}
                  `,
                style: { transformOrigin: "center" }
              }
            )
          ]
        },
        link.href
      );
    }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 flex-shrink-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative hidden md:block", children: [
        /* @__PURE__ */ jsxs(
          Button,
          {
            onClick: () => setShowFontMenu(!showFontMenu),
            variant: "ghost",
            className: "flex items-center space-x-1",
            children: [
              /* @__PURE__ */ jsx("i", { className: "fas fa-font text-base" }),
              /* @__PURE__ */ jsx("span", { className: "hidden sm:inline text-sm font-semibold", children: fonts[currentFont].name }),
              /* @__PURE__ */ jsx(ChevronDown, { className: "ml-1 h-4 w-4 shrink-0 opacity-50" })
            ]
          }
        ),
        showFontMenu && /* @__PURE__ */ jsx("div", { className: "absolute right-0 mt-2 w-40 bg-background border border-border rounded-md shadow-lg z-50", children: /* @__PURE__ */ jsx("div", { className: "py-1", children: Object.entries(fonts).map(([key, font]) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              changeFont(key);
              setShowFontMenu(false);
            },
            className: `w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors ${currentFont === key ? "bg-muted font-bold" : ""}`,
            style: { fontFamily: font.name },
            children: font.name
          },
          key
        )) }) })
      ] }),
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: toggleDarkMode,
          variant: "ghost",
          size: "icon",
          className: "hidden md:inline-flex",
          "aria-label": "Toggle dark mode",
          children: /* @__PURE__ */ jsx("i", { className: `fas ${darkMode ? "fa-sun" : "fa-moon"} text-lg` })
        }
      ),
      /* @__PURE__ */ jsxs(Sheet, { children: [
        /* @__PURE__ */ jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "md:hidden",
            "aria-label": "Mobil menüyü aç",
            children: /* @__PURE__ */ jsx(MenuIcon, { className: "h-6 w-6" })
          }
        ) }),
        /* @__PURE__ */ jsxs(SheetContent, { side: "right", className: `w-full sm:w-80 flex flex-col p-6 text-foreground ${darkMode ? "bg-background" : "bg-white/80 backdrop-blur-sm"}`, children: [
          /* @__PURE__ */ jsx(SheetHeader, { className: "text-left mb-8", children: /* @__PURE__ */ jsx(SheetTitle, { className: "text-3xl font-bold font-playfair text-primary", children: "Menü" }) }),
          /* @__PURE__ */ jsx("nav", { className: "flex flex-col space-y-6 text-xl", children: navLinks.map((link) => {
            const linkPath = getPathname(link.href);
            const isActive = linkPath === "/" && url === "/" || linkPath !== "/" && url.startsWith(linkPath);
            return /* @__PURE__ */ jsx(
              Link,
              {
                href: link.href,
                className: `font-medium transition-colors hover:text-primary ${isActive ? "text-primary" : "text-foreground"}`,
                children: link.label
              },
              link.href
            );
          }) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-auto pt-8 space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative w-full text-center", children: [
              /* @__PURE__ */ jsxs(
                Button,
                {
                  onClick: () => setShowFontMenu(!showFontMenu),
                  variant: "outline",
                  className: "w-full flex items-center justify-center space-x-2",
                  children: [
                    /* @__PURE__ */ jsx("i", { className: "fas fa-font text-sm" }),
                    /* @__PURE__ */ jsx("span", { children: fonts[currentFont].name }),
                    /* @__PURE__ */ jsx(ChevronDown, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })
                  ]
                }
              ),
              showFontMenu && /* @__PURE__ */ jsx("div", { className: "absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-background border border-border rounded-md shadow-lg z-50", children: /* @__PURE__ */ jsx("div", { className: "py-1", children: Object.entries(fonts).map(([key, font]) => /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => {
                    changeFont(key);
                    setShowFontMenu(false);
                  },
                  className: `w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors ${currentFont === key ? "bg-muted font-bold" : ""}`,
                  style: { fontFamily: font.name },
                  children: font.name
                },
                key
              )) }) })
            ] }),
            /* @__PURE__ */ jsxs(
              Button,
              {
                onClick: toggleDarkMode,
                variant: "outline",
                className: "w-full flex items-center justify-center space-x-2",
                children: [
                  /* @__PURE__ */ jsx("i", { className: `fas ${darkMode ? "fa-sun" : "fa-moon"}` }),
                  /* @__PURE__ */ jsx("span", { children: darkMode ? "Aydınlık Mod" : "Karanlık Mod" })
                ]
              }
            )
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    "input",
    {
      type,
      className: cn(
        "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ref,
      ...props
    }
  );
});
Input.displayName = "Input";
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "bg-card border-t border-border text-foreground pt-16 pb-8", children: /* @__PURE__ */ jsxs("div", { className: "container max-w-7xl mx-auto px-4 md:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "footer-about-section", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-4 font-playfair text-primary", children: "Tur10" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "Türkiye'nin eşsiz güzelliklerini keşfetmeniz için unutulmaz seyahat deneyimleri tasarlıyoruz. Bizimle keşfedin, anı biriktirin." }),
        /* @__PURE__ */ jsxs("div", { className: "flex space-x-4 mt-6", children: [
          /* @__PURE__ */ jsx("a", { href: "#", className: "text-muted-foreground hover:text-primary transition-colors", children: /* @__PURE__ */ jsx(Facebook, { size: 20 }) }),
          /* @__PURE__ */ jsx("a", { href: "#", className: "text-muted-foreground hover:text-primary transition-colors", children: /* @__PURE__ */ jsx(Twitter, { size: 20 }) }),
          /* @__PURE__ */ jsx("a", { href: "#", className: "text-muted-foreground hover:text-primary transition-colors", children: /* @__PURE__ */ jsx(Instagram, { size: 20 }) }),
          /* @__PURE__ */ jsx("a", { href: "#", className: "text-muted-foreground hover:text-primary transition-colors", children: /* @__PURE__ */ jsx(Linkedin, { size: 20 }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "footer-links-section", children: [
        /* @__PURE__ */ jsx("h4", { className: "text-xl font-semibold mb-4", children: "Hızlı Bağlantılar" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: route("home"), className: "text-muted-foreground hover:text-primary transition-colors", children: "Ana Sayfa" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: route("tours.index"), className: "text-muted-foreground hover:text-primary transition-colors", children: "Turlar" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: route("destinations.index"), className: "text-muted-foreground hover:text-primary transition-colors", children: "Destinasyonlar" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: route("about.us"), className: "text-muted-foreground hover:text-primary transition-colors", children: "Hakkımızda" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: route("contact.us"), className: "text-muted-foreground hover:text-primary transition-colors", children: "İletişim" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "footer-contact-section", children: [
        /* @__PURE__ */ jsx("h4", { className: "text-xl font-semibold mb-4", children: "Bize Ulaşın" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-3 text-muted-foreground", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold mr-2", children: "Adres:" }),
            /* @__PURE__ */ jsx("span", { children: "Kızılay, Ankara, Türkiye" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold mr-2", children: "Email:" }),
            /* @__PURE__ */ jsx("a", { href: "mailto:info@tur10.com", className: "hover:text-primary transition-colors", children: "info@tur10.com" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold mr-2", children: "Telefon:" }),
            /* @__PURE__ */ jsx("a", { href: "tel:+905551234567", className: "hover:text-primary transition-colors", children: "+90 555 123 45 67" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "footer-newsletter-section", children: [
        /* @__PURE__ */ jsx("h4", { className: "text-xl font-semibold mb-4", children: "Fırsatlardan Haberdar Olun" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-4", children: "Yeni turlarımızdan ve özel indirimlerden ilk siz haberdar olun." }),
        /* @__PURE__ */ jsxs("form", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx(Input, { type: "email", placeholder: "E-posta adresiniz", className: "bg-input rounded-r-none" }),
          /* @__PURE__ */ jsx(Button, { type: "submit", className: "rounded-l-none", "aria-label": "Abone Ol", children: /* @__PURE__ */ jsx(Send, { size: 20 }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "border-t border-border pt-8 text-center text-sm text-muted-foreground", children: /* @__PURE__ */ jsxs("p", { children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " Tur10. Tüm Hakları Saklıdır. Geliştirici: Yavuz Sinan. "
    ] }) })
  ] }) });
}
function Guest({ children, seo = {} }) {
  const { canonical } = usePage().props;
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: seo.title }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: seo.description }),
      canonical && /* @__PURE__ */ jsx("link", { rel: "canonical", href: canonical }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: seo.og_url }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: seo.og_title }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: seo.og_description }),
      seo.og_image && /* @__PURE__ */ jsx("meta", { property: "og:image", content: seo.og_image }),
      /* @__PURE__ */ jsx("meta", { property: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsx("meta", { property: "twitter:url", content: seo.og_url }),
      /* @__PURE__ */ jsx("meta", { property: "twitter:title", content: seo.og_title }),
      /* @__PURE__ */ jsx("meta", { property: "twitter:description", content: seo.og_description }),
      seo.og_image && /* @__PURE__ */ jsx("meta", { property: "twitter:image", content: seo.og_image })
    ] }),
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("main", { className: "flex-grow", children }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const Card = React.forwardRef(({
  className,
  ...props
}, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    ),
    ...props
  }
));
Card.displayName = "Card";
const CardHeader = React.forwardRef(({
  className,
  ...props
}, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn(
      "flex flex-col space-y-1.5 p-6",
      className
    ),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(({
  className,
  children,
  ...props
}, ref) => /* @__PURE__ */ jsx(
  "h3",
  {
    ref,
    className: cn(
      "font-semibold leading-none tracking-tight",
      className
    ),
    ...props,
    children
  }
));
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(({
  className,
  ...props
}, ref) => /* @__PURE__ */ jsx(
  "p",
  {
    ref,
    className: cn(
      "text-sm text-muted-foreground",
      className
    ),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(({
  className,
  ...props
}, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(({
  className,
  ...props
}, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn(
      "flex items-center p-6 pt-0",
      className
    ),
    ...props
  }
));
CardFooter.displayName = "CardFooter";
function AboutUs() {
  return /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Hakkımızda" }),
    /* @__PURE__ */ jsxs("section", { className: "relative h-[50vh] md:h-[60vh] bg-cover bg-center text-white flex items-center justify-center", style: { backgroundImage: `url('https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')` }, children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 to-transparent about-us-hero-overlay" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 text-center px-4", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-5xl md:text-7xl font-bold mb-4 font-playfair", children: "Keşfetmenin Ruhu" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg md:text-xl max-w-3xl mx-auto", children: "Biz sadece bir seyahat acentesi değiliz; bizler, Türkiye'nin kalbine yolculuk düzenleyen hikaye anlatıcılarıyız." })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-background text-foreground", children: /* @__PURE__ */ jsx("div", { className: "container max-w-6xl mx-auto px-4 md:px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-16 items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "order-2 md:order-1", children: /* @__PURE__ */ jsxs(Card, { className: "bg-card rounded-lg border-none p-8 shadow-lg", children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-4xl font-bold mb-6 text-primary font-playfair", children: "Bizim Hikayemiz" }) }),
        /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsx("p", { className: "text-lg leading-relaxed mb-4", children: "Her şey, bu topraklara duyduğumuz derin bir aşkla başladı. Yıllar önce bir grup seyahat tutkunu olarak, Türkiye'nin saklı kalmış güzelliklerini, zengin tarihini ve sıcakkanlı insanlarını dünyayla paylaşma hayali kurduk. Bu hayal, bugün binlerce misafirimize unutulmaz anılar biriktiren bir tutkuya dönüştü." }),
          /* @__PURE__ */ jsx("p", { className: "text-lg leading-relaxed", children: "Amacımız, size sadece yerleri göstermek değil, o yerlerin ruhunu hissettirmek. Bir Ege kasabasında sabah kahvesinin tadını, Kapadokya'da gün doğumunun büyüsünü, Karadeniz yaylalarında bulutların üzerinde yürümenin özgürlüğünü... İşte biz bu anları sizin için ölümsüzleştiriyoruz." })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "order-1 md:order-2", children: /* @__PURE__ */ jsx("img", { src: "https://images.pexels.com/photos/2440024/pexels-photo-2440024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", alt: "Bizim Hikayemiz", className: "rounded-lg shadow-2xl object-cover w-full h-auto transform hover:scale-105 transition-transform duration-500" }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-background text-foreground", children: /* @__PURE__ */ jsxs("div", { className: "container max-w-6xl mx-auto px-4 md:px-8 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold mb-12 text-primary font-playfair", children: "Bizi Biz Yapan Değerler" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: [
        /* @__PURE__ */ jsxs(Card, { className: "about-us-feature-card p-6 bg-card shadow-lg flex flex-col items-center text-center border-none transform hover:-translate-y-2 transition-transform duration-300", children: [
          /* @__PURE__ */ jsx(Heart, { className: "h-12 w-12 text-primary mb-4" }),
          /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl font-semibold mb-3", children: "Tutku" }),
          /* @__PURE__ */ jsx(CardContent, { className: "text-muted-foreground", children: "İşimizi bir görev olarak değil, bir tutku olarak görüyoruz. Bu tutku, her turumuza yansır." })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "about-us-feature-card p-6 bg-card shadow-lg flex flex-col items-center text-center border-none transform hover:-translate-y-2 transition-transform duration-300", children: [
          /* @__PURE__ */ jsx(Compass, { className: "h-12 w-12 text-primary mb-4" }),
          /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl font-semibold mb-3", children: "Keşif" }),
          /* @__PURE__ */ jsx(CardContent, { className: "text-muted-foreground", children: "Sadece popüler olanı değil, keşfedilmeyi bekleyen gizli kalmış güzellikleri de rotalarımıza dahil ediyoruz." })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "about-us-feature-card p-6 bg-card shadow-lg flex flex-col items-center text-center border-none transform hover:-translate-y-2 transition-transform duration-300", children: [
          /* @__PURE__ */ jsx(Users, { className: "h-12 w-12 text-primary mb-4" }),
          /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl font-semibold mb-3", children: "Otantiklik" }),
          /* @__PURE__ */ jsx(CardContent, { className: "text-muted-foreground", children: "Yerel yaşamın bir parçası olmanızı sağlıyor, size gerçek ve samimi deneyimler sunuyoruz." })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "about-us-feature-card p-6 bg-card shadow-lg flex flex-col items-center text-center border-none transform hover:-translate-y-2 transition-transform duration-300", children: [
          /* @__PURE__ */ jsx(Check, { className: "h-12 w-12 text-primary mb-4" }),
          /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl font-semibold mb-3", children: "Güvenilirlik" }),
          /* @__PURE__ */ jsx(CardContent, { className: "text-muted-foreground", children: "Yolculuğunuzun her anında yanınızdayız. Güvenliğiniz ve konforunuz bizim için en önemli önceliktir." })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "about-us-feature-card p-6 bg-card shadow-lg flex flex-col items-center text-center border-none transform hover:-translate-y-2 transition-transform duration-300", children: [
          /* @__PURE__ */ jsx(Leaf, { className: "h-12 w-12 text-primary mb-4" }),
          /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl font-semibold mb-3", children: "Sorumluluk" }),
          /* @__PURE__ */ jsx(CardContent, { className: "text-muted-foreground", children: "Doğaya ve yerel kültürlere saygılı, sürdürülebilir turizm anlayışını benimsiyoruz. Gelecek nesillere daha güzel bir dünya bırakmak için çalışıyoruz." })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "about-us-feature-card p-6 bg-card shadow-lg flex flex-col items-center text-center border-none transform hover:-translate-y-2 transition-transform duration-300", children: [
          /* @__PURE__ */ jsx(Camera, { className: "h-12 w-12 text-primary mb-4" }),
          /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl font-semibold mb-3", children: "Anılar" }),
          /* @__PURE__ */ jsx(CardContent, { className: "text-muted-foreground", children: "Bizim için en büyük ödül, evinize unutulmaz anılarla dönmenizdir. Her detayı bu anları yaratmak için planlıyoruz." })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-primary text-primary-foreground text-center", children: /* @__PURE__ */ jsxs("div", { className: "container max-w-6xl mx-auto px-4 md:px-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold mb-6 font-playfair", children: "Türkiye'nin Büyüsünü Bizimle Yaşayın" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl mb-8 max-w-2xl mx-auto", children: "Hayalinizdeki yolculuğu tasarlamak için sabırsızlanıyoruz. Maceraya hazır mısınız?" }),
      /* @__PURE__ */ jsx(Button, { asChild: true, variant: "secondary", size: "lg", className: "px-10 py-4 text-lg transform hover:scale-105 transition-transform duration-300", children: /* @__PURE__ */ jsx(Link, { href: route("contact.us"), children: "Maceraya Başla" }) })
    ] }) })
  ] });
}
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AboutUs
}, Symbol.toStringTag, { value: "Module" }));
const Avatar = React.forwardRef(({
  className,
  ...props
}, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Root,
  {
    ref,
    className: cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    ),
    ...props
  }
));
Avatar.displayName = AvatarPrimitive.Root.displayName;
const AvatarImage = React.forwardRef(({
  className,
  ...props
}, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Image,
  {
    ref,
    className: cn("aspect-square h-full w-full", className),
    ...props
  }
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
const AvatarFallback = React.forwardRef(({
  className,
  ...props
}, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Fallback,
  {
    ref,
    className: cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    ),
    ...props
  }
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuSubTrigger = React.forwardRef(({
  className,
  inset,
  children,
  ...props
}, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto h-4 w-4" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = React.forwardRef(({
  className,
  ...props
}, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = React.forwardRef(({
  className,
  children,
  forceMount,
  ...props
}, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    forceMount,
    ...props,
    children
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef(({
  className,
  inset,
  ...props
}, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef(({
  className,
  children,
  checked,
  ...props
}, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef(({
  className,
  children,
  ...props
}, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Dot, { className: "h-4 w-4 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef(({
  className,
  inset,
  ...props
}, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef(({
  className,
  ...props
}, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1e6;
let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
const toastTimeouts = /* @__PURE__ */ new Map();
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) => t.id === action.toast.id ? { ...t, ...action.toast } : t)
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map((t) => t.id === toastId || toastId === void 0 ? {
          ...t,
          open: false
        } : t)
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };
  }
};
const listeners = [];
let memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast({
  ...props
}) {
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    }
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = React.useState(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}
const ToastProvider = ToastPrimitives.Provider;
const ToastViewport = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Viewport,
  {
    ref,
    className: cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    ToastPrimitives.Root,
    {
      ref,
      className: cn(toastVariants({ variant }), className),
      ...props
    }
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;
const ToastAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitives.Action.displayName;
const ToastClose = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Close,
  {
    ref,
    className: cn(
      "absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
const ToastTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Title,
  {
    ref,
    className: cn("text-sm font-semibold [&+div]:text-xs select-text", className),
    ...props
  }
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
const ToastDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ToastPrimitives.Description, { ref, className: cn("text-sm select-text", className), ...props }));
ToastDescription.displayName = ToastPrimitives.Description.displayName;
function Toaster() {
  const { toasts } = useToast();
  return /* @__PURE__ */ jsxs(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action, ...props }) {
      return /* @__PURE__ */ jsxs(Toast, { ...props, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsx(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsx(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ jsx(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsx(ToastViewport, {})
  ] });
}
function AuthenticatedLayout({ header, children, actionButton }) {
  var _a;
  const { auth, flash } = usePage().props;
  const user = auth.user;
  const { toast: toast2 } = useToast();
  useEffect(() => {
    if (flash == null ? void 0 : flash.success) {
      toast2({
        title: "Başarılı!",
        description: flash.success,
        className: "bg-green-600 text-white border-green-600"
      });
    }
    if (flash == null ? void 0 : flash.error) {
      toast2({
        title: "Hata!",
        description: flash.error,
        variant: "destructive"
      });
    }
  }, [flash, toast2]);
  const navLinks = [
    { name: "Dashboard", href: route("admin.dashboard"), activeCheck: "admin.dashboard" },
    { name: "Turlar", href: route("admin.tours.index"), activeCheck: "admin.tours." },
    { name: "İçerikler", href: route("admin.contents.index"), activeCheck: "admin.contents." },
    { name: "Destinasyonlar", href: route("admin.destinations.index"), activeCheck: "admin.destinations." },
    { name: "Opsiyonel Aktiviteler", href: route("admin.optional-activities.index"), activeCheck: "admin.optional-activities." },
    { name: "Ayarlar", href: route("admin.settings.seo.index"), activeCheck: "admin.settings." }
  ];
  const NavLinksContent = ({ isMobile = false }) => navLinks.map((link) => /* @__PURE__ */ jsx(
    Link,
    {
      href: link.href,
      className: `transition-colors hover:text-foreground ${route().current().startsWith(link.activeCheck) ? "text-foreground" : "text-muted-foreground"} ${isMobile ? "text-lg" : "text-sm font-medium"}`,
      children: link.name
    },
    link.name
  ));
  return /* @__PURE__ */ jsxs("div", { className: "admin-panel min-h-screen w-full bg-muted/40", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("header", { className: "sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 sm:px-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
          /* @__PURE__ */ jsxs(Link, { href: route("admin.dashboard"), className: "flex items-center gap-2 font-bold", children: [
            /* @__PURE__ */ jsx(Package, { className: "h-6 w-6" }),
            /* @__PURE__ */ jsx("span", { className: "hidden sm:inline-block", children: "Tur10 Panel" })
          ] }),
          /* @__PURE__ */ jsx("nav", { className: "hidden md:flex md:items-center md:gap-5", children: /* @__PURE__ */ jsx(NavLinksContent, {}) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxs(Sheet, { children: [
            /* @__PURE__ */ jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { size: "icon", variant: "outline", className: "md:hidden", children: [
              /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" }),
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Menüyü Aç" })
            ] }) }),
            /* @__PURE__ */ jsx(SheetContent, { side: "left", children: /* @__PURE__ */ jsxs("nav", { className: "grid gap-6 text-lg font-medium mt-6", children: [
              /* @__PURE__ */ jsxs(Link, { href: route("admin.dashboard"), className: "flex items-center gap-2 font-bold mb-4", children: [
                /* @__PURE__ */ jsx(Package, { className: "h-6 w-6" }),
                /* @__PURE__ */ jsx("span", { children: "Tur10 Panel" })
              ] }),
              /* @__PURE__ */ jsx(NavLinksContent, { isMobile: true })
            ] }) })
          ] }),
          user && /* @__PURE__ */ jsxs(DropdownMenu, { children: [
            /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "ghost", className: "relative h-10 w-10 rounded-full", children: /* @__PURE__ */ jsxs(Avatar, { className: "h-9 w-9", children: [
              /* @__PURE__ */ jsx(AvatarImage, { src: `https://ui-avatars.com/api/?name=${user.name.replace(" ", "+")}&background=random`, alt: user.name }),
              /* @__PURE__ */ jsx(AvatarFallback, { children: ((_a = user.name) == null ? void 0 : _a.charAt(0).toUpperCase()) || "?" })
            ] }) }) }),
            /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", className: "w-56", children: [
              /* @__PURE__ */ jsxs(DropdownMenuLabel, { children: [
                /* @__PURE__ */ jsx("p", { className: "font-medium", children: user.name }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: user.email })
              ] }),
              /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
              /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("profile.edit"), children: "Profil" }) }),
              /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
              /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("logout"), method: "post", as: "button", className: "w-full text-left", children: "Çıkış Yap" }) })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("main", { className: "py-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          header && /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold tracking-tight", children: header }),
          actionButton && /* @__PURE__ */ jsx("div", { children: actionButton })
        ] }),
        children
      ] })
    ] }),
    /* @__PURE__ */ jsx(Toaster, {})
  ] });
}
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(LabelPrimitive.Root, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = LabelPrimitive.Root.displayName;
const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      className: cn(
        "flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ref,
      ...props
    }
  );
});
Textarea.displayName = "Textarea";
function InputError({ message, className = "", ...props }) {
  return message ? /* @__PURE__ */ jsx(
    "p",
    {
      ...props,
      className: "text-sm text-red-600 " + className,
      children: message
    }
  ) : null;
}
const Tabs = TabsPrimitive.Root;
const TabsList = React.forwardRef(({
  className,
  ...props
}, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.List,
  {
    ref,
    className: cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = TabsPrimitive.List.displayName;
const TabsTrigger = React.forwardRef(({
  className,
  ...props
}, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
const TabsContent = React.forwardRef(({
  className,
  ...props
}, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
const Checkbox = React.forwardRef(({
  className,
  ...props
}, ref) => /* @__PURE__ */ jsx(
  CheckboxPrimitive.Root,
  {
    ref,
    className: cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(
      CheckboxPrimitive.Indicator,
      {
        className: cn(
          "flex items-center justify-center text-current"
        ),
        children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" })
      }
    )
  }
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
const RichTextEditor$2 = ({ value, onChange, placeholder, className, showHtmlButton = true }) => {
  const [showHtml, setShowHtml] = useState(false);
  const QuillComponent = useRef(null);
  const [isQuillLoaded, setIsQuillLoaded] = useState(false);
  useEffect(() => {
    import("react-quill").then((module) => {
      QuillComponent.current = module.default;
      Promise.resolve({                      });
      setIsQuillLoaded(true);
    });
  }, []);
  const modules = {
    toolbar: [
      [{ "header": [1, 2, 3, false] }, { "font": [] }],
      ["bold", "italic", "underline", "blockquote"],
      [{ "list": "ordered" }, { "list": "bullet" }, { "indent": "-1" }, { "indent": "+1" }],
      [{ "align": [] }],
      [{ "color": [] }, { "background": [] }],
      ["link", "image", "video"],
      ["clean"]
    ]
  };
  const formats = [
    "header",
    "font",
    "bold",
    "italic",
    "underline",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "align",
    "color",
    "background",
    "link",
    "image",
    "video"
  ];
  return /* @__PURE__ */ jsxs("div", { className: `richtext-editor-wrapper border rounded-md ${className || ""}`, children: [
    showHtmlButton && /* @__PURE__ */ jsx("div", { className: "p-2 border-b bg-gray-50 flex justify-end", children: /* @__PURE__ */ jsxs(
      Button,
      {
        type: "button",
        variant: "outline",
        size: "sm",
        onClick: () => setShowHtml(!showHtml),
        children: [
          /* @__PURE__ */ jsx(Code, { className: "h-4 w-4 mr-2" }),
          showHtml ? "Editöre Dön" : "HTML Göster"
        ]
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "p-1", children: showHtml ? /* @__PURE__ */ jsx(
      "textarea",
      {
        className: "w-full h-64 p-2 font-mono text-sm border-none rounded-md bg-gray-900 text-white focus:ring-0",
        value,
        onChange: (e2) => onChange(e2.target.value),
        placeholder: "HTML kodunu buraya girin..."
      }
    ) : (
      // Quill yüklendiğinde editörü, yüklenmediğinde ise bir yüklenme göstergesi göster.
      isQuillLoaded && QuillComponent.current ? /* @__PURE__ */ jsx(
        QuillComponent.current,
        {
          theme: "snow",
          value,
          onChange,
          modules,
          formats,
          placeholder: placeholder || "İçeriğinizi buraya yazın...",
          className: "bg-white"
        }
      ) : /* @__PURE__ */ jsx("div", { children: "Editör yükleniyor..." })
    ) })
  ] });
};
const RichTextEditor$3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: RichTextEditor$2
}, Symbol.toStringTag, { value: "Module" }));
const Dialog = SheetPrimitive.Root;
const DialogPortal = SheetPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = SheetPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    SheetPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(SheetPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = SheetPrimitive.Content.displayName;
const DialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    ),
    ...props
  }
);
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    ),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Title,
  {
    ref,
    className: cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
DialogTitle.displayName = SheetPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = SheetPrimitive.Description.displayName;
const MediaItemCard = React__default.memo(({ item, selectedMedia, setSelectedMedia, isMultiSelect, onDelete }) => {
  const handleCardClick = () => {
    setSelectedMedia(item);
  };
  const isSelected = isMultiSelect ? selectedMedia.some((media) => media.id === item.id) : (selectedMedia == null ? void 0 : selectedMedia.id) === item.id;
  return /* @__PURE__ */ jsxs(
    Card,
    {
      className: `relative cursor-pointer ${isSelected ? "border-primary ring-2 ring-primary" : ""} media-item-card`,
      onClick: handleCardClick,
      children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "destructive",
            size: "icon",
            className: "absolute top-1 right-1 h-6 w-6 z-20",
            onClick: (e2) => {
              e2.stopPropagation();
              onDelete(item.id);
            },
            children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsxs(CardContent, { className: "p-2", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: item.thumbnail_url || item.original_url,
              alt: item.name || item.file_name,
              className: "w-full h-32 object-cover rounded-md media-item-image"
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-center mt-2 truncate media-item-name", children: item.name || item.file_name })
        ] })
      ]
    },
    item.id
  );
});
const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx(
        SelectPrimitive.Viewport,
        {
          className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
          children
        }
      ),
      /* @__PURE__ */ jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
const MediaManagerModal = ({ isOpen, onClose, onMediaSelect, initialSelectedMedia = null, isMultiSelect = false }) => {
  const { toast: toast2 } = useToast();
  const { auth } = usePage().props;
  const [mediaItems, setMediaItems] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(isMultiSelect ? initialSelectedMedia || [] : initialSelectedMedia);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadTags, setUploadTags] = useState("");
  const [uploadDestinationId, setUploadDestinationId] = useState("");
  const [filterDestination, setFilterDestination] = useState("all");
  const [filterTags, setFilterTags] = useState("");
  const [destinations, setDestinations] = useState([]);
  useEffect(() => {
    if (isOpen) {
      fetchMediaItems();
      fetchDestinations();
    }
  }, [isOpen]);
  useEffect(() => {
    setSelectedMedia(isMultiSelect ? initialSelectedMedia || [] : initialSelectedMedia);
  }, [initialSelectedMedia, isMultiSelect]);
  const fetchMediaItems = async () => {
    try {
      const response = await fetch("/api/admin/media", {
        headers: {
          "Accept": "application/json"
        }
      });
      const data = await response.json();
      if (response.ok) {
        setMediaItems(data.media);
      } else {
        toast2({
          title: "Medya Yüklenemedi",
          description: data.error || "Medyalar çekilirken bir hata oluştu.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast2({
        title: "Hata",
        description: "Medyalar çekilirken bir ağ hatası oluştu.",
        variant: "destructive"
      });
      console.error("Medya çekme hatası:", error);
    }
  };
  const fetchDestinations = async () => {
    try {
      const response = await fetch("/api/destinations");
      const data = await response.json();
      if (response.ok) {
        setDestinations(data);
      } else {
        toast2({
          title: "Destinasyonlar Yüklenemedi",
          description: data.error || "Destinasyonlar çekilirken bir hata oluştu.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast2({
        title: "Hata",
        description: "Destinasyonlar çekilirken bir ağ hatası oluştu.",
        variant: "destructive"
      });
      console.error("Destinasyon çekme hatası:", error);
    }
  };
  const handleFileUpload = async () => {
    if (!uploadFile) {
      toast2({
        title: "Uyarı",
        description: "Lütfen bir dosya seçin.",
        variant: "warning"
      });
      return;
    }
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", uploadFile);
    if (uploadDestinationId) {
      formData.append("destination_id", uploadDestinationId);
    }
    if (uploadTags) {
      formData.append("tags", JSON.stringify(uploadTags.split(",").map((tag) => tag.trim())));
    }
    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content");
      const response = await fetch("/api/admin/media", {
        method: "POST",
        headers: {
          "X-CSRF-TOKEN": csrfToken
          // CSRF tokenini başlığa ekle
          // 'Authorization': `Bearer ${auth.user.token}`, 
        },
        body: formData
      });
      const data = await response.json();
      if (response.ok) {
        toast2({
          title: "Başarılı",
          description: data.message,
          variant: "default"
        });
        setUploadFile(null);
        setUploadTags("");
        setUploadDestinationId("");
        fetchMediaItems();
        setSelectedMedia((prev) => {
          let updatedSelection;
          if (isMultiSelect) {
            const currentPrev = Array.isArray(prev) ? prev : prev ? [prev] : [];
            updatedSelection = [...currentPrev, data.media];
          } else {
            updatedSelection = data.media;
          }
          onMediaSelect(updatedSelection);
          return updatedSelection;
        });
        onClose();
      } else {
        const errorMessage = data.errors ? Object.values(data.errors).flat().join(" ") : data.error || "Dosya yüklenirken bir hata oluştu.";
        toast2({
          title: "Yükleme Hatası",
          description: errorMessage,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast2({
        title: "Hata",
        description: "Dosya yüklenirken bir ağ hatası oluştu.",
        variant: "destructive"
      });
      console.error("Dosya yükleme hatası:", error);
    } finally {
      setIsUploading(false);
    }
  };
  const handleMediaItemClick = (item) => {
    if (isMultiSelect) {
      setSelectedMedia(
        (prev) => prev.some((media) => media.id === item.id) ? prev.filter((media) => media.id !== item.id) : [...prev, item]
      );
    } else {
      setSelectedMedia(item);
    }
  };
  const handleSelectMedia = () => {
    if (isMultiSelect) {
      onMediaSelect(selectedMedia);
    } else {
      if (selectedMedia) {
        onMediaSelect(selectedMedia);
      } else {
        toast2({
          title: "Uyarı",
          description: "Lütfen bir medya öğesi seçin.",
          variant: "warning"
        });
        return;
      }
    }
    onClose();
  };
  const deleteMediaItem = async (idToDelete) => {
    if (!confirm("Bu medya öğesini kalıcı olarak silmek istediğinizden emin misiniz?")) {
      return;
    }
    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content");
      const response = await fetch(`/api/admin/media/${idToDelete}`, {
        method: "DELETE",
        headers: {
          "X-CSRF-TOKEN": csrfToken,
          "Accept": "application/json"
        }
      });
      const data = await response.json();
      if (response.ok) {
        toast2({
          title: "Başarılı",
          description: data.message,
          variant: "default"
        });
        fetchMediaItems();
        if (isMultiSelect) {
          setSelectedMedia((prev) => prev.filter((item) => item.id !== idToDelete));
        } else if (selectedMedia && selectedMedia.id === idToDelete) {
          setSelectedMedia(null);
        }
      } else {
        toast2({
          title: "Silme Hatası",
          description: data.error || "Medya öğesi silinirken bir hata oluştu.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast2({
        title: "Hata",
        description: "Medya öğesi silinirken bir ağ hatası oluştu.",
        variant: "destructive"
      });
      console.error("Medya silme hatası:", error);
    }
  };
  const filteredMediaItems = mediaItems.filter((item) => {
    const matchesDestination = filterDestination === "all" ? true : item.destination_id && item.destination_id.toString() === filterDestination;
    const matchesTags = filterTags ? item.tags && item.tags.some((tag) => tag.toLowerCase().includes(filterTags.toLowerCase())) : true;
    return matchesDestination && matchesTags;
  });
  return /* @__PURE__ */ jsxs(Dialog, { open: isOpen, onOpenChange: onClose, children: [
    " ",
    /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-4xl max-h-[90vh] flex flex-col media-manager-modal-content bg-white p-0", children: [
      /* @__PURE__ */ jsx(DialogHeader, { className: "p-6 pb-4", children: /* @__PURE__ */ jsx(DialogTitle, { className: "media-manager-modal-title", children: "Medya Kütüphanesi" }) }),
      /* @__PURE__ */ jsxs(Tabs, { defaultValue: "library", className: "w-full flex-1 overflow-y-auto px-6", children: [
        /* @__PURE__ */ jsxs(TabsList, { className: "grid w-full grid-cols-2 media-manager-tabs-list sticky top-0 bg-white z-10", children: [
          /* @__PURE__ */ jsx(TabsTrigger, { value: "library", className: "media-manager-tab-trigger", children: "Kütüphane" }),
          /* @__PURE__ */ jsx(TabsTrigger, { value: "upload", className: "media-manager-tab-trigger", children: "Yükle" })
        ] }),
        /* @__PURE__ */ jsxs(TabsContent, { value: "library", className: "space-y-4 pt-4 media-library-content", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-4 items-end media-filter-section", children: [
            /* @__PURE__ */ jsxs(Select, { onValueChange: setFilterDestination, value: filterDestination, className: "media-destination-filter-select", children: [
              /* @__PURE__ */ jsx(SelectTrigger, { className: "w-full", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Destinasyon Seç" }) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "Tüm Destinasyonlar" }),
                destinations.map((dest) => /* @__PURE__ */ jsx(SelectItem, { value: dest.id.toString(), children: dest.name }, dest.id))
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              Input,
              {
                type: "text",
                placeholder: "Etiketlere Göre Filtrele (virgülle ayırın)",
                value: filterTags,
                onChange: (e2) => setFilterTags(e2.target.value),
                className: "media-tags-filter"
              }
            ),
            /* @__PURE__ */ jsxs(Button, { onClick: () => {
              setFilterDestination("all");
              setFilterTags("");
            }, variant: "outline", className: "media-clear-filters-button", children: [
              "Filtreleri Temizle ",
              /* @__PURE__ */ jsx(XCircle, { className: "ml-2 h-4 w-4" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 media-grid", children: filteredMediaItems.length > 0 ? filteredMediaItems.map((item) => /* @__PURE__ */ jsx(
            MediaItemCard,
            {
              item,
              selectedMedia,
              setSelectedMedia: handleMediaItemClick,
              isMultiSelect,
              onDelete: deleteMediaItem
            },
            item.id
          )) : /* @__PURE__ */ jsx("p", { className: "col-span-full text-center text-gray-500 media-no-media-found", children: "Hiç medya bulunamadı." }) })
        ] }),
        /* @__PURE__ */ jsxs(TabsContent, { value: "upload", className: "space-y-4 pt-4 media-upload-content", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid w-full max-w-sm items-center gap-1.5 media-file-upload-section", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "media-file", className: "media-file-label", children: "Dosya Seç" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "media-file",
                type: "file",
                onChange: (e2) => setUploadFile(e2.target.files[0]),
                className: "media-file-input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid w-full max-w-sm items-center gap-1.5 media-tags-input-section", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "media-tags", className: "media-tags-label", children: "Etiketler (virgülle ayırın)" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "media-tags",
                type: "text",
                value: uploadTags,
                onChange: (e2) => setUploadTags(e2.target.value),
                placeholder: "ör: doğa, şehir, tarih",
                className: "media-tags-input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid w-full max-w-sm items-center gap-1.5 media-destination-input-section", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "media-destination", className: "media-destination-label", children: "Destinasyon" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                id: "media-destination",
                value: uploadDestinationId,
                onChange: (e2) => setUploadDestinationId(e2.target.value),
                className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 media-destination-select",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Seçiniz (Opsiyonel)" }),
                  destinations.map((dest) => /* @__PURE__ */ jsx("option", { value: dest.id, children: dest.name }, dest.id))
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx(Button, { onClick: handleFileUpload, disabled: isUploading, className: "media-upload-button", children: isUploading ? "Yükleniyor..." : /* @__PURE__ */ jsxs(Fragment, { children: [
            " ",
            /* @__PURE__ */ jsx(Upload, { className: "mr-2 h-4 w-4" }),
            " Yükle"
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { className: "media-modal-footer flex-shrink-0 flex justify-start sm:space-x-2 p-6 pt-4 border-t", children: [
        " ",
        /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: onClose, className: "media-cancel-button", children: "İptal" }),
        /* @__PURE__ */ jsx(Button, { onClick: handleSelectMedia, disabled: isMultiSelect ? selectedMedia.length === 0 : !selectedMedia, className: "media-select-button", children: "Seç" }),
        " "
      ] })
    ] })
  ] });
};
const Command = React.forwardRef(({
  className,
  ...props
}, ref) => /* @__PURE__ */ jsx(
  Command$1,
  {
    ref,
    className: cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    ),
    ...props
  }
));
Command.displayName = Command$1.displayName;
const CommandInput = React.forwardRef(({
  className,
  ...props
}, ref) => /* @__PURE__ */ jsxs("div", { className: "flex items-center border-b px-3", "cmdk-input-wrapper": "", children: [
  /* @__PURE__ */ jsx(Search, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }),
  /* @__PURE__ */ jsx(
    Command$1.Input,
    {
      ref,
      className: cn(
        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props
    }
  )
] }));
CommandInput.displayName = Command$1.Input.displayName;
const CommandList = React.forwardRef(({
  className,
  ...props
}, ref) => /* @__PURE__ */ jsx(
  Command$1.List,
  {
    ref,
    className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className),
    ...props
  }
));
CommandList.displayName = Command$1.List.displayName;
const CommandEmpty = React.forwardRef((props, ref) => /* @__PURE__ */ jsx(
  Command$1.Empty,
  {
    ref,
    className: "py-6 text-center text-sm",
    ...props
  }
));
CommandEmpty.displayName = Command$1.Empty.displayName;
const CommandGroup = React.forwardRef(({
  className,
  ...props
}, ref) => /* @__PURE__ */ jsx(
  Command$1.Group,
  {
    ref,
    className: cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
      className
    ),
    ...props
  }
));
CommandGroup.displayName = Command$1.Group.displayName;
const CommandSeparator = React.forwardRef(({
  className,
  ...props
}, ref) => /* @__PURE__ */ jsx(
  Command$1.Separator,
  {
    ref,
    className: cn("-mx-1 h-px bg-border", className),
    ...props
  }
));
CommandSeparator.displayName = Command$1.Separator.displayName;
const CommandItem = React.forwardRef(({
  className,
  ...props
}, ref) => /* @__PURE__ */ jsx(
  Command$1.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground",
      className
    ),
    ...props
  }
));
CommandItem.displayName = Command$1.Item.displayName;
const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverContent = React.forwardRef(({
  className,
  align = "start",
  // align center yerine start yapıldı
  sideOffset = 0,
  // Boşluğu kaldırmak için 4 yerine 0 yapıldı
  ...props
}, ref) => /* @__PURE__ */ jsx(
  PopoverPrimitive.Content,
  {
    ref,
    align,
    sideOffset,
    className: cn(
      "z-50 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  ...props
}) {
  return /* @__PURE__ */ jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
const MultiSelect = ({ options, selectedValues, onSelect, placeholder }) => {
  const [open, setOpen] = React.useState(false);
  const displaySelectedItems = () => {
    if (!selectedValues || selectedValues.length === 0) {
      return /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: placeholder });
    }
    const selectedItems = selectedValues.map((value) => {
      const option = options.find((opt) => opt.value === value);
      return option ? /* @__PURE__ */ jsx(Badge, { variant: "default", className: "flex items-center gap-1 pr-1 text-xs", children: option.label }, value) : null;
    }).filter(Boolean);
    return /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1 w-full", children: selectedItems });
  };
  return /* @__PURE__ */ jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "outline",
        role: "combobox",
        "aria-expanded": open,
        className: "w-full justify-between h-auto py-2",
        children: [
          displaySelectedItems(),
          /* @__PURE__ */ jsx(ChevronDown, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(PopoverContent, { className: "w-[--radix-popover-trigger-width] p-0", children: /* @__PURE__ */ jsxs(Command, { children: [
      /* @__PURE__ */ jsx(CommandInput, { placeholder: "Ara..." }),
      /* @__PURE__ */ jsx(CommandEmpty, { children: "Hiç öğe bulunamadı." }),
      /* @__PURE__ */ jsx(CommandGroup, { children: options.map((option) => /* @__PURE__ */ jsxs(
        CommandItem,
        {
          value: option.label,
          onSelect: () => {
            onSelect(option.value);
          },
          children: [
            /* @__PURE__ */ jsx(
              Check,
              {
                className: cn(
                  "mr-2 h-4 w-4",
                  selectedValues.includes(option.value) ? "opacity-100" : "opacity-0"
                )
              }
            ),
            option.label
          ]
        },
        option.value
      )) })
    ] }) })
  ] });
};
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}) {
  const defaultClassNames = getDefaultClassNames();
  return /* @__PURE__ */ jsx(
    DayPicker,
    {
      showOutsideDays,
      className: cn(
        "bg-background group/calendar p-3 [--cell-size:2rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      ),
      captionLayout,
      formatters: {
        formatMonthDropdown: (date) => date.toLocaleString("default", { month: "short" }),
        ...formatters
      },
      classNames: {
        root: cn("w-fit", defaultClassNames.root),
        months: cn("relative flex flex-col gap-4 md:flex-row", defaultClassNames.months),
        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex h-[--cell-size] w-full items-center justify-center px-[--cell-size]",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "flex h-[--cell-size] w-full items-center justify-center gap-1.5 text-sm font-medium",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn("bg-popover absolute inset-0 opacity-0", defaultClassNames.dropdown),
        caption_label: cn("select-none font-medium", captionLayout === "label" ? "text-sm" : "[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5", defaultClassNames.caption_label),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground flex-1 select-none rounded-md text-[0.8rem] font-normal",
          defaultClassNames.weekday
        ),
        week: cn("mt-2 flex w-full", defaultClassNames.week),
        week_number_header: cn("w-[--cell-size] select-none", defaultClassNames.week_number_header),
        week_number: cn(
          "text-muted-foreground select-none text-[0.8rem]",
          defaultClassNames.week_number
        ),
        day: cn(
          "group/day relative aspect-square h-full w-full select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md",
          defaultClassNames.day
        ),
        range_start: cn("bg-accent rounded-l-md", defaultClassNames.range_start),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("bg-accent rounded-r-md", defaultClassNames.range_end),
        today: cn(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "text-muted-foreground aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ),
        disabled: cn("text-muted-foreground opacity-50", defaultClassNames.disabled),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames
      },
      components: {
        Root: ({ className: className2, rootRef, ...props2 }) => {
          return /* @__PURE__ */ jsx("div", { "data-slot": "calendar", ref: rootRef, className: cn(className2), ...props2 });
        },
        Chevron: ({ className: className2, orientation, ...props2 }) => {
          if (orientation === "left") {
            return /* @__PURE__ */ jsx(ChevronLeftIcon, { className: cn("size-4", className2), ...props2 });
          }
          if (orientation === "right") {
            return /* @__PURE__ */ jsx(ChevronRightIcon, { className: cn("size-4", className2), ...props2 });
          }
          return /* @__PURE__ */ jsx(ChevronDownIcon, { className: cn("size-4", className2), ...props2 });
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props2 }) => {
          return /* @__PURE__ */ jsx("td", { ...props2, children: /* @__PURE__ */ jsx(
            "div",
            {
              className: "flex size-[--cell-size] items-center justify-center text-center",
              children
            }
          ) });
        },
        ...components
      },
      ...props
    }
  );
}
function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}) {
  const defaultClassNames = getDefaultClassNames();
  const ref = React.useRef(null);
  React.useEffect(() => {
    var _a;
    if (modifiers.focused) (_a = ref.current) == null ? void 0 : _a.focus();
  }, [modifiers.focused]);
  return /* @__PURE__ */ jsx(
    Button,
    {
      ref,
      variant: "ghost",
      size: "icon",
      "data-day": day.date.toLocaleDateString(),
      "data-selected-single": modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle,
      "data-range-start": modifiers.range_start,
      "data-range-end": modifiers.range_end,
      "data-range-middle": modifiers.range_middle,
      className: cn(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square h-auto w-full min-w-[--cell-size] flex-col gap-1 font-normal leading-none data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      ),
      ...props
    }
  );
}
function ContentForm({ content, contentCategories, destinations, isEdit = false, onError }) {
  const { data, setData, post, put, reset, processing, errors } = useForm({
    title: (content == null ? void 0 : content.title) || "",
    slug: (content == null ? void 0 : content.slug) || "",
    summary: (content == null ? void 0 : content.summary) || "",
    content: (content == null ? void 0 : content.content) || "",
    published_at: (content == null ? void 0 : content.published_at) ? new Date(content.published_at) : null,
    image_id: (content == null ? void 0 : content.image_id) || null,
    categories: (content == null ? void 0 : content.content_categories.map((cat) => cat.id)) || [],
    destinations: (content == null ? void 0 : content.destinations.map((dest) => dest.id)) || [],
    meta_title: (content == null ? void 0 : content.meta_title) || "",
    meta_description: (content == null ? void 0 : content.meta_description) || ""
  });
  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState((content == null ? void 0 : content.image) || null);
  const { media_files } = usePage().props;
  useEffect(() => {
    if (isEdit && content) {
      setData({
        title: content.title || "",
        slug: content.slug || "",
        summary: content.summary || "",
        content: content.content || "",
        published_at: content.published_at ? new Date(content.published_at) : null,
        image_id: content.image_id || null,
        categories: content.content_categories.map((cat) => cat.id) || [],
        destinations: content.destinations.map((dest) => dest.id) || [],
        meta_title: content.meta_title || "",
        meta_description: content.meta_description || ""
      });
      setSelectedImage(content.image || null);
    }
  }, [content, isEdit]);
  useEffect(() => {
    if (!isEdit && data.title) {
      setData("slug", generateSlug(data.title));
    }
  }, [data.title, isEdit]);
  const generateSlug = (text) => {
    return text.toString().normalize("NFD").replace(new RegExp("\\p{M}", "gu"), "").toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-");
  };
  const handleSubmit = (e2) => {
    e2.preventDefault();
    if (isEdit) {
      put(route("admin.contents.update", content.id), {
        onSuccess: () => {
        },
        onError: (validationErrors) => {
          if (typeof onError === "function") {
            onError(validationErrors);
          }
        }
      });
    } else {
      post(route("admin.contents.store"), {
        onSuccess: () => {
          reset();
        },
        onError: (validationErrors) => {
          if (typeof onError === "function") {
            onError(validationErrors);
          }
        }
      });
    }
  };
  const handleMediaSelect = (media) => {
    setSelectedImage(media);
    setData("image_id", media ? media.id : null);
    setMediaModalOpen(false);
  };
  const categoryOptions = contentCategories.map((cat) => ({
    value: cat.id,
    label: cat.name
  }));
  const destinationOptions = destinations.map((dest) => ({
    value: dest.id,
    label: dest.name
  }));
  const handleCategorySelect = (categoryId) => {
    setData((prevData) => {
      const currentCategories = prevData.categories || [];
      const isSelected = currentCategories.includes(categoryId);
      if (isSelected) {
        return {
          ...prevData,
          categories: currentCategories.filter((id) => id !== categoryId)
        };
      } else {
        return {
          ...prevData,
          categories: [...currentCategories, categoryId]
        };
      }
    });
  };
  const handleDestinationSelect = (destinationId) => {
    setData((prevData) => {
      const currentDestinations = prevData.destinations || [];
      const isSelected = currentDestinations.includes(destinationId);
      if (isSelected) {
        return {
          ...prevData,
          destinations: currentDestinations.filter((id) => id !== destinationId)
        };
      } else {
        return {
          ...prevData,
          destinations: [...currentDestinations, destinationId]
        };
      }
    });
  };
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { children: isEdit ? "İçeriği Düzenle" : "Yeni İçerik Oluştur" }),
      /* @__PURE__ */ jsx(CardDescription, { children: isEdit ? "Mevcut içeriğin detaylarını güncelleyin." : "Yeni bir içerik oluşturun ve yayınlayın." })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxs(Tabs, { defaultValue: "general", children: [
        /* @__PURE__ */ jsxs(TabsList, { children: [
          /* @__PURE__ */ jsx(TabsTrigger, { value: "general", children: "Genel Bilgiler" }),
          /* @__PURE__ */ jsx(TabsTrigger, { value: "seo", children: "SEO Ayarları" })
        ] }),
        /* @__PURE__ */ jsxs(TabsContent, { value: "general", className: "space-y-6 pt-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "title", children: "Başlık" }),
            /* @__PURE__ */ jsx(Input, { id: "title", name: "title", value: data.title, onChange: (e2) => setData("title", e2.target.value), required: true, className: "mt-1 block w-full" }),
            /* @__PURE__ */ jsx(InputError, { message: errors.title, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "slug", children: "Slug" }),
            /* @__PURE__ */ jsx(Input, { id: "slug", name: "slug", value: data.slug, onChange: (e2) => setData("slug", e2.target.value), required: true, className: "mt-1 block w-full" }),
            /* @__PURE__ */ jsx(InputError, { message: errors.slug, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "summary", children: "Özet" }),
            /* @__PURE__ */ jsx(Textarea, { id: "summary", name: "summary", value: data.summary, onChange: (e2) => setData("summary", e2.target.value), className: "mt-1 block w-full", rows: "4" }),
            /* @__PURE__ */ jsx(InputError, { message: errors.summary, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "content", children: "İçerik" }),
            /* @__PURE__ */ jsx(RichTextEditor$2, { value: data.content, onChange: (value) => setData("content", value), className: "mt-1 block w-full min-h-[300px] bg-white text-gray-900 editor-light-mode" }),
            /* @__PURE__ */ jsx(InputError, { message: errors.content, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "published_at", children: "Yayınlanma Tarihi" }),
            /* @__PURE__ */ jsxs(Popover, { children: [
              /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "outline", className: cn("w-[240px] justify-start text-left font-normal", !data.published_at && "text-muted-foreground"), children: [
                /* @__PURE__ */ jsx(CalendarIcon, { className: "mr-2 h-4 w-4" }),
                data.published_at ? format(data.published_at, "PPP") : /* @__PURE__ */ jsx("span", { children: "Tarih Seç" })
              ] }) }),
              /* @__PURE__ */ jsx(PopoverContent, { className: "w-auto p-0", children: /* @__PURE__ */ jsx(Calendar, { mode: "single", selected: data.published_at, onSelect: (date) => setData("published_at", date), initialFocus: true }) })
            ] }),
            /* @__PURE__ */ jsx(InputError, { message: errors.published_at, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Öne Çıkan Görsel" }),
            /* @__PURE__ */ jsxs("div", { className: "mt-2 border rounded-md p-4 flex flex-col items-center justify-center space-y-4", children: [
              selectedImage ? /* @__PURE__ */ jsx("img", { src: selectedImage.original_url, alt: selectedImage.name, className: "max-w-full h-48 object-contain rounded-md" }) : /* @__PURE__ */ jsxs("div", { className: "text-gray-500 flex flex-col items-center", children: [
                /* @__PURE__ */ jsx(ImageIcon, { className: "h-12 w-12 text-gray-400" }),
                /* @__PURE__ */ jsx("span", { className: "mt-2", children: "Henüz bir görsel seçilmedi." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsxs(Button, { type: "button", variant: "outline", onClick: () => setMediaModalOpen(true), children: [
                  /* @__PURE__ */ jsx(PlusCircle, { className: "mr-2 h-4 w-4" }),
                  selectedImage ? "Görseli Değiştir" : "Görsel Seç"
                ] }),
                selectedImage && /* @__PURE__ */ jsxs(Button, { type: "button", variant: "destructive", onClick: () => handleMediaSelect(null), children: [
                  /* @__PURE__ */ jsx(Trash2, { className: "mr-2 h-4 w-4" }),
                  " Kaldır"
                ] })
              ] }),
              /* @__PURE__ */ jsx(MediaManagerModal, { isOpen: mediaModalOpen, onClose: () => setMediaModalOpen(false), onMediaSelect: handleMediaSelect, initialSelectedMedia: selectedImage, isMultiSelect: false, media: media_files })
            ] }),
            /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.image_id })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "categories", children: "Kategoriler" }),
            /* @__PURE__ */ jsx(MultiSelect, { options: categoryOptions, selectedValues: data.categories, onSelect: handleCategorySelect, placeholder: "Kategori Seç" }),
            /* @__PURE__ */ jsx(InputError, { message: errors.categories, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "destinations", children: "Destinasyonlar" }),
            /* @__PURE__ */ jsx(MultiSelect, { options: destinationOptions, selectedValues: data.destinations, onSelect: handleDestinationSelect, placeholder: "Destinasyon Seç" }),
            /* @__PURE__ */ jsx(InputError, { message: errors.destinations, className: "mt-2" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(TabsContent, { value: "seo", className: "space-y-6 pt-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "SEO Ayarları" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Bu içeriğe özel SEO başlığı ve açıklaması girin. Boş bırakılırsa genel ayarlardaki şablonlar kullanılır." }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "meta_title", children: "Meta Başlık" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "meta_title",
                type: "text",
                value: data.meta_title || "",
                onChange: (e2) => setData("meta_title", e2.target.value),
                className: "mt-1 block w-full",
                placeholder: "Genel şablon kullanılacak"
              }
            ),
            /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.meta_title })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "meta_description", children: "Meta Açıklama" }),
            /* @__PURE__ */ jsx(
              Textarea,
              {
                id: "meta_description",
                value: data.meta_description || "",
                onChange: (e2) => setData("meta_description", e2.target.value),
                className: "mt-1 block w-full",
                rows: 3,
                placeholder: "Genel şablon kullanılacak"
              }
            ),
            /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.meta_description })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4 mt-6", children: /* @__PURE__ */ jsx(Button, { type: "submit", disabled: processing, children: "Kaydet" }) })
    ] }) })
  ] });
}
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ContentForm
}, Symbol.toStringTag, { value: "Module" }));
function Create$2({ auth, contentCategories, destinations, media_files }) {
  const { toast: toast2 } = useToast();
  const handleFormError = (errors) => {
    let errorMessages = [];
    if (errors.general && errors.general.length > 0) {
      errorMessages = [...errorMessages, ...errors.general];
    }
    Object.keys(errors).forEach((key) => {
      if (key !== "general" && Array.isArray(errors[key])) {
        errorMessages = [...errorMessages, ...errors[key]];
      }
    });
    const finalErrorMessage = errorMessages.length > 0 ? errorMessages.join("\n") : "Bilinmeyen bir hata oluştu.";
    toast2({
      title: "İçerik oluşturulamadı.",
      description: finalErrorMessage,
      variant: "destructive"
    });
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      user: auth.user,
      header: "Yeni İçerik Oluştur",
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Yeni İçerik Oluştur" }),
        /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto", children: /* @__PURE__ */ jsx(
          ContentForm,
          {
            content: null,
            contentCategories,
            destinations,
            media_files,
            processing: false,
            errors: {},
            isEdit: false,
            onError: handleFormError
          }
        ) })
      ]
    }
  );
}
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Create$2
}, Symbol.toStringTag, { value: "Module" }));
function Edit$4({ auth, content, contentCategories, destinations }) {
  const { toast: toast2 } = useToast();
  const { media_files } = usePage().props;
  const handleFormError = (errors) => {
    let errorMessages = [];
    if (errors.general && errors.general.length > 0) {
      errorMessages = [...errorMessages, ...errors.general];
    }
    Object.keys(errors).forEach((key) => {
      if (key !== "general" && Array.isArray(errors[key])) {
        errorMessages = [...errorMessages, ...errors[key]];
      }
    });
    const finalErrorMessage = errorMessages.length > 0 ? errorMessages.join("\n") : "Bilinmeyen bir hata oluştu.";
    toast2({
      title: "İçerik güncellenemedi.",
      description: finalErrorMessage,
      variant: "destructive"
    });
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      user: auth.user,
      header: `İçeriği Düzenle: ${content.title}`,
      children: [
        /* @__PURE__ */ jsx(Head, { title: `İçeriği Düzenle: ${content.title}` }),
        /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto", children: /* @__PURE__ */ jsx(
          ContentForm,
          {
            content,
            contentCategories,
            destinations,
            media_files,
            processing: false,
            errors: {},
            isEdit: true,
            onError: handleFormError
          }
        ) })
      ]
    }
  );
}
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Edit$4
}, Symbol.toStringTag, { value: "Module" }));
const Table = React.forwardRef(({
  className,
  ...props
}, ref) => /* @__PURE__ */ jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsx(
  "table",
  {
    ref,
    className: cn("w-full caption-bottom text-sm", className),
    ...props
  }
) }));
Table.displayName = "Table";
const TableHeader = React.forwardRef(({
  className,
  ...props
}, ref) => /* @__PURE__ */ jsx("thead", { ref, className: cn("[&_tr]:border-b", className), ...props }));
TableHeader.displayName = "TableHeader";
const TableBody = React.forwardRef(({
  className,
  ...props
}, ref) => /* @__PURE__ */ jsx("tbody", { ref, className: cn("[&_tr:last-child]:border-0", className), ...props }));
TableBody.displayName = "TableBody";
const TableFooter = React.forwardRef(({
  className,
  ...props
}, ref) => /* @__PURE__ */ jsx(
  "tfoot",
  {
    ref,
    className: cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    ),
    ...props
  }
));
TableFooter.displayName = "TableFooter";
const TableRow = React.forwardRef(({
  className,
  ...props
}, ref) => /* @__PURE__ */ jsx(
  "tr",
  {
    ref,
    className: cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    ),
    ...props
  }
));
TableRow.displayName = "TableRow";
const TableHead = React.forwardRef(({
  className,
  ...props
}, ref) => /* @__PURE__ */ jsx(
  "th",
  {
    ref,
    className: cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    ),
    ...props
  }
));
TableHead.displayName = "TableHead";
const TableCell = React.forwardRef(({
  className,
  ...props
}, ref) => /* @__PURE__ */ jsx(
  "td",
  {
    ref,
    className: cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className),
    ...props
  }
));
TableCell.displayName = "TableCell";
const TableCaption = React.forwardRef(({
  className,
  ...props
}, ref) => /* @__PURE__ */ jsx("caption", { ref, className: cn("mt-4 text-sm text-muted-foreground", className), ...props }));
TableCaption.displayName = "TableCaption";
function Pagination({ links }) {
  function getClassName(active) {
    if (active) {
      return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-primary-500 focus:text-primary-500 bg-white shadow-md text-primary-500";
    } else {
      return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-primary-500 focus:text-primary-500";
    }
  }
  return /* @__PURE__ */ jsx("div", { className: "flex flex-wrap -mb-1", children: links.map((link, key) => link.url === null ? /* @__PURE__ */ jsx(
    "div",
    {
      className: "mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded",
      dangerouslySetInnerHTML: { __html: link.label }
    },
    key
  ) : /* @__PURE__ */ jsx(
    Link,
    {
      className: getClassName(link.active),
      href: link.url,
      dangerouslySetInnerHTML: { __html: link.label }
    },
    key
  )) });
}
function CategoryManagerModal({ isOpen, onClose }) {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const { data, setData, post, put, processing, errors, reset } = useForm({
    name: ""
  });
  useEffect(() => {
    if (isOpen) {
      fetchCategories();
      reset();
      setEditingCategory(null);
    }
  }, [isOpen]);
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      toast({
        title: "Hata",
        description: "Lütfen tüm alanları kontrol edin.",
        variant: "destructive"
      });
    }
  }, [errors]);
  const fetchCategories = async () => {
    try {
      const response = await axios.get(route("admin.content-categories.index"));
      setCategories(response.data.data);
    } catch (err) {
      toast({
        title: "Hata",
        description: "Kategoriler yüklenirken bir hata oluştu.",
        variant: "destructive"
      });
      console.error("Kategori yükleme hatası:", err);
    }
  };
  const handleSubmit = (e2) => {
    e2.preventDefault();
    if (editingCategory) {
      put(route("admin.content-categories.update", editingCategory.id), {
        onSuccess: () => {
          toast({
            title: "Başarılı",
            description: "Kategori başarıyla güncellendi."
          });
          reset();
          setEditingCategory(null);
          fetchCategories();
        },
        onError: (err) => {
          toast({
            title: "Hata",
            description: "Kategori güncellenirken bir hata oluştu.",
            variant: "destructive"
          });
          console.error("Kategori güncelleme hatası:", err);
        }
      });
    } else {
      post(route("admin.content-categories.store"), {
        onSuccess: () => {
          toast({
            title: "Başarılı",
            description: "Kategori başarıyla eklendi."
          });
          reset();
          fetchCategories();
        },
        onError: (err) => {
          toast({
            title: "Hata",
            description: "Kategori eklenirken bir hata oluştu.",
            variant: "destructive"
          });
          console.error("Kategori ekleme hatası:", err);
        }
      });
    }
  };
  const handleEdit = (category) => {
    setEditingCategory(category);
    setData("name", category.name);
  };
  const handleDelete = (id) => {
    if (confirm("Bu kategoriyi silmek istediğinize emin misiniz?")) {
      router$1.delete(route("admin.content-categories.destroy", id), {
        onSuccess: () => {
          toast({
            title: "Başarılı",
            description: "Kategori başarıyla silindi."
          });
          fetchCategories();
        },
        onError: (err) => {
          toast({
            title: "Hata",
            description: "Kategori silinirken bir hata oluştu.",
            variant: "destructive"
          });
          console.error("Kategori silme hatası:", err);
        }
      });
    }
  };
  return /* @__PURE__ */ jsx(Dialog, { open: isOpen, onOpenChange: onClose, children: /* @__PURE__ */ jsxs(DialogContent, { className: "sm:max-w-[425px] bg-white p-6 rounded-lg shadow-lg border border-gray-200", children: [
    " ",
    /* @__PURE__ */ jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsx(DialogTitle, { children: editingCategory ? "Kategori Düzenle" : "Yeni Kategori Ekle" }),
      /* @__PURE__ */ jsx(DialogDescription, { children: editingCategory ? "Kategoriyi düzenleyin." : "Yeni bir içerik kategorisi ekleyin." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Kategori Adı" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "name",
            type: "text",
            value: data.name,
            onChange: (e2) => setData("name", e2.target.value),
            className: "mt-1 block w-full",
            disabled: processing
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsx(Button, { type: "submit", disabled: processing, children: editingCategory ? "Güncelle" : "Ekle" }),
      editingCategory && /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", onClick: () => {
        setEditingCategory(null);
        reset();
      }, children: "İptal" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-2", children: "Mevcut Kategoriler" }),
      /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableHead, { children: "ID" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Adı" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Aksiyonlar" })
        ] }) }),
        /* @__PURE__ */ jsx(TableBody, { children: categories.length > 0 ? categories.map((category) => /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: category.id }),
          /* @__PURE__ */ jsx(TableCell, { children: category.name }),
          /* @__PURE__ */ jsxs(TableCell, { className: "text-right flex items-center justify-end space-x-2", children: [
            /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: () => handleEdit(category), children: /* @__PURE__ */ jsx(Edit$5, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: () => handleDelete(category.id), className: "text-red-600 hover:text-red-800", children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
          ] })
        ] }, category.id)) : /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: "3", className: "text-center py-4 text-muted-foreground", children: "Henüz kategori bulunmamaktadır." }) }) })
      ] })
    ] })
  ] }) });
}
function Index$3({ auth, contents }) {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const { delete: deleteContent } = useForm();
  const categoryColors = [
    "bg-blue-100 text-blue-800",
    "bg-green-100 text-green-800",
    "bg-yellow-100 text-yellow-800",
    "bg-red-100 text-red-800",
    "bg-purple-100 text-purple-800",
    "bg-indigo-100 text-indigo-800",
    "bg-pink-100 text-pink-800"
  ];
  const getCategoryBadgeClass = (index) => {
    return `${categoryColors[index % categoryColors.length]} rounded-full px-2 py-0.5 text-xs font-semibold`;
  };
  const handleDelete = (id) => {
    if (confirm("Bu içeriği silmek istediğinize emin misiniz?")) {
      deleteContent(route("admin.contents.destroy", id));
    }
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      user: auth.user,
      header: "İçerikler",
      actionButton: /* @__PURE__ */ jsxs("div", { className: "flex space-x-2", children: [
        /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("admin.contents.create"), children: "Yeni İçerik Ekle" }) }),
        /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setIsCategoryModalOpen(true), children: "Kategoriler" })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "İçerikler" }),
        /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "p-4", children: [
          /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs(Table, { className: "min-w-full divide-y divide-gray-200", children: [
            /* @__PURE__ */ jsx(TableHeader, { className: "bg-gray-50", children: /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsx(TableHead, { className: "w-[100px]", children: "ID" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Başlık" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Kategori" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Destinasyonlar" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Yayınlanma Tarihi" }),
              /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Aksiyonlar" })
            ] }) }),
            /* @__PURE__ */ jsx(TableBody, { children: contents.data.map((content) => /* @__PURE__ */ jsxs(TableRow, { className: "group", children: [
              /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: content.id }),
              /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
                Link,
                {
                  href: route("admin.contents.edit", content.id),
                  className: "text-black hover:underline",
                  children: content.title
                }
              ) }),
              /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1", children: content.content_categories.map((cat, index) => /* @__PURE__ */ jsx(Badge, { className: getCategoryBadgeClass(index), children: cat.name }, cat.id)) }) }),
              /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1", children: content.destinations.map((dest) => /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "rounded-full bg-blue-100 text-blue-800", children: dest.name }, dest.id)) }) }),
              /* @__PURE__ */ jsx(TableCell, { children: content.published_at ? /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsx(CheckCircle, { className: "h-4 w-4 text-green-500" }),
                /* @__PURE__ */ jsx("span", { children: format(new Date(content.published_at), "dd.MM.yyyy") })
              ] }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 text-muted-foreground", children: [
                /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4 text-orange-500" }),
                /* @__PURE__ */ jsx("span", { children: "Taslak" })
              ] }) }),
              /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [
                /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
                  Button,
                  {
                    "aria-haspopup": "true",
                    size: "icon",
                    variant: "ghost",
                    children: [
                      /* @__PURE__ */ jsx(MoreHorizontal, { className: "h-4 w-4" }),
                      /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Menüyü aç" })
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", children: [
                  /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("contents.show", content.slug), className: "block w-full text-left", target: "_blank", children: /* @__PURE__ */ jsxs("span", { className: "flex items-center", children: [
                    /* @__PURE__ */ jsx(ExternalLink, { className: "mr-2 h-4 w-4" }),
                    " İçeriği Görüntüle"
                  ] }) }) }),
                  /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("admin.contents.edit", content.id), className: "block w-full text-left", children: /* @__PURE__ */ jsxs("span", { className: "flex items-center", children: [
                    /* @__PURE__ */ jsx(Edit$5, { className: "mr-2 h-4 w-4" }),
                    " Düzenle"
                  ] }) }) }),
                  /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
                  /* @__PURE__ */ jsx(DropdownMenuItem, { onClick: () => handleDelete(content.id), className: "text-red-600 focus:text-red-600 focus:bg-red-50", children: /* @__PURE__ */ jsxs("span", { className: "flex items-center", children: [
                    /* @__PURE__ */ jsx(Trash2, { className: "mr-2 h-4 w-4" }),
                    " Sil"
                  ] }) })
                ] })
              ] }) })
            ] }, content.id)) })
          ] }) }),
          /* @__PURE__ */ jsx(Pagination, { links: contents.links })
        ] }) }),
        /* @__PURE__ */ jsx(
          CategoryManagerModal,
          {
            isOpen: isCategoryModalOpen,
            onClose: () => setIsCategoryModalOpen(false)
          }
        )
      ]
    }
  );
}
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$3
}, Symbol.toStringTag, { value: "Module" }));
const RichTextEditor$1 = lazy(() => Promise.resolve().then(() => RichTextEditor$3));
const isBrowser$1 = typeof window !== "undefined";
function Edit$3({ auth, destination }) {
  const [isMediaManagerOpen, setIsMediaManagerOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { data, setData, post, put, processing, errors, reset } = useForm({
    name: "",
    slug: "",
    summary: "",
    description: "",
    image_id: null,
    is_popular: false,
    meta_title: "",
    meta_description: ""
  });
  useEffect(() => {
    if (destination) {
      setData({
        name: destination.name,
        slug: destination.slug,
        summary: destination.summary || "",
        description: destination.description,
        image_id: destination.image_id || null,
        is_popular: destination.is_popular || false,
        meta_title: destination.meta_title || "",
        meta_description: destination.meta_description || ""
      });
      setSelectedImage(destination.image || null);
    } else {
      reset();
      setSelectedImage(null);
    }
  }, [destination]);
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      toast({
        title: "Hata",
        description: "Lütfen tüm alanları kontrol edin.",
        variant: "destructive"
      });
    }
  }, [errors]);
  const handleSubmit = (e2) => {
    e2.preventDefault();
    if (destination) {
      put(route("admin.destinations.update", destination.id), {
        onSuccess: () => {
          toast({
            title: "Başarılı",
            description: "Destinasyon başarıyla güncellendi."
          });
        },
        onError: (err) => {
          console.error("Destinasyon güncelleme hatası:", err);
        }
      });
    } else {
      post(route("admin.destinations.store"), {
        onSuccess: () => {
          toast({
            title: "Başarılı",
            description: "Destinasyon başarıyla eklendi."
          });
          window.location.href = route("admin.destinations.index");
        },
        onError: (err) => {
          console.error("Destinasyon ekleme hatası:", err);
        }
      });
    }
  };
  const handleMediaSelect = (media) => {
    setSelectedImage(media);
    setData("image_id", media.id);
    setIsMediaManagerOpen(false);
  };
  const handleRemoveImage = () => {
    setSelectedImage(null);
    setData("image_id", null);
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      user: auth.user,
      header: destination ? "Destinasyon Düzenle" : "Yeni Destinasyon Ekle",
      actionButton: /* @__PURE__ */ jsx(Link, { href: route("admin.destinations.index"), children: /* @__PURE__ */ jsx(Button, { variant: "outline", children: "Geri Dön" }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: destination ? "Destinasyon Düzenle" : "Yeni Destinasyon Ekle" }),
        /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto", children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsx(CardTitle, { children: destination ? "Destinasyon Bilgilerini Düzenle" : "Yeni Destinasyon Oluştur" }),
            /* @__PURE__ */ jsx(CardDescription, { children: destination ? "Destinasyonunuzun detaylarını güncelleyin." : "Yeni bir destinasyon oluşturmak için gerekli bilgileri girin." })
          ] }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
            /* @__PURE__ */ jsxs(Tabs, { defaultValue: "general", children: [
              /* @__PURE__ */ jsxs(TabsList, { children: [
                /* @__PURE__ */ jsx(TabsTrigger, { value: "general", children: "Genel Bilgiler" }),
                /* @__PURE__ */ jsx(TabsTrigger, { value: "seo", children: "SEO Ayarları" })
              ] }),
              /* @__PURE__ */ jsx(TabsContent, { value: "general", className: "space-y-6 pt-4", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 space-y-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Destinasyon Adı" }),
                    /* @__PURE__ */ jsx(Input, { id: "name", type: "text", value: data.name, onChange: (e2) => setData("name", e2.target.value), className: "mt-1 block w-full", disabled: processing }),
                    /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(Label, { htmlFor: "slug", children: "Slug" }),
                    /* @__PURE__ */ jsx(Input, { id: "slug", type: "text", value: data.slug, onChange: (e2) => setData("slug", e2.target.value), className: "mt-1 block w-full", disabled: processing }),
                    /* @__PURE__ */ jsx(InputError, { message: errors.slug, className: "mt-2" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(Label, { htmlFor: "summary", children: "Özet" }),
                    /* @__PURE__ */ jsx(Textarea, { id: "summary", value: data.summary, onChange: (e2) => setData("summary", e2.target.value), className: "mt-1 block w-full", rows: 2 }),
                    /* @__PURE__ */ jsx(InputError, { message: errors.summary, className: "mt-2" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "md:col-span-1", children: [
                  /* @__PURE__ */ jsx(Label, { children: "Öne Çıkan Görsel" }),
                  /* @__PURE__ */ jsxs("div", { className: "mt-1 border rounded-md p-4 flex flex-col items-center justify-center space-y-4", children: [
                    selectedImage ? /* @__PURE__ */ jsxs("div", { className: "relative w-40 h-40 rounded-md overflow-hidden", children: [
                      /* @__PURE__ */ jsx("img", { src: selectedImage.thumbnail_url, alt: "Öne Çıkan Görsel", className: "w-full h-full object-cover" }),
                      /* @__PURE__ */ jsx(Button, { type: "button", variant: "destructive", size: "icon", className: "absolute top-1 right-1 h-6 w-6 rounded-full", onClick: handleRemoveImage, children: /* @__PURE__ */ jsx(XCircle, { className: "h-4 w-4" }) })
                    ] }) : /* @__PURE__ */ jsxs("div", { className: "text-gray-500 flex flex-col items-center justify-center w-40 h-40 bg-muted rounded-md", children: [
                      /* @__PURE__ */ jsx(Image, { className: "h-12 w-12 text-gray-400" }),
                      /* @__PURE__ */ jsx("span", { className: "mt-2 text-sm", children: "Görsel Seç" })
                    ] }),
                    /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", className: "w-full", onClick: () => setIsMediaManagerOpen(true), children: selectedImage ? "Değiştir" : "Görsel Seç" })
                  ] }),
                  /* @__PURE__ */ jsx(InputError, { message: errors.image_id, className: "mt-2" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "md:col-span-3", children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "description", children: "Açıklama" }),
                  isBrowser$1 && /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { children: "Yükleniyor..." }), children: /* @__PURE__ */ jsx(
                    RichTextEditor$1,
                    {
                      id: "description",
                      value: data.description,
                      onChange: (content) => setData("description", content),
                      placeholder: "Destinasyon hakkında detaylı bilgi girin...",
                      className: "mt-1 block w-full"
                    }
                  ) }),
                  /* @__PURE__ */ jsx(InputError, { message: errors.description, className: "mt-2" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "md:col-span-3 flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsx(Checkbox, { id: "is_popular", checked: data.is_popular, onCheckedChange: (checked) => setData("is_popular", checked) }),
                  /* @__PURE__ */ jsx(Label, { htmlFor: "is_popular", children: "Popüler olarak işaretle" })
                ] })
              ] }) }),
              /* @__PURE__ */ jsxs(TabsContent, { value: "seo", className: "space-y-6 pt-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "SEO Ayarları" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Bu destinasyona özel SEO başlığı ve açıklaması girin. Boş bırakılırsa genel ayarlardaki şablonlar kullanılır." }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "meta_title", children: "Meta Başlık" }),
                  /* @__PURE__ */ jsx(Input, { id: "meta_title", type: "text", value: data.meta_title || "", onChange: (e2) => setData("meta_title", e2.target.value), className: "mt-1 block w-full", placeholder: "Genel şablon kullanılacak" }),
                  /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.meta_title })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "meta_description", children: "Meta Açıklama" }),
                  /* @__PURE__ */ jsx(Textarea, { id: "meta_description", value: data.meta_description || "", onChange: (e2) => setData("meta_description", e2.target.value), className: "mt-1 block w-full", rows: 3, placeholder: "Genel şablon kullanılacak" }),
                  /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.meta_description })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(Button, { type: "submit", disabled: processing, children: destination ? "Güncelle" : "Oluştur" }) })
          ] }) })
        ] }) }) }),
        /* @__PURE__ */ jsx(
          MediaManagerModal,
          {
            isOpen: isMediaManagerOpen,
            onClose: () => setIsMediaManagerOpen(false),
            onMediaSelect: handleMediaSelect
          }
        )
      ]
    }
  );
}
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Edit$3
}, Symbol.toStringTag, { value: "Module" }));
function Index$2({ auth, destinations: initialDestinations }) {
  const [destinations, setDestinations] = useState(initialDestinations.data);
  useEffect(() => {
    setDestinations(initialDestinations.data);
  }, [initialDestinations.data]);
  const { delete: deleteDestination } = useForm();
  const handleDelete = (id) => {
    if (confirm("Bu destinasyonu silmek istediğinize emin misiniz?")) {
      deleteDestination(route("admin.destinations.destroy", id), {
        onSuccess: () => {
          toast({
            title: "Başarılı",
            description: "Destinasyon başarıyla silindi."
          });
          router.reload({ only: ["destinations"] });
        },
        onError: (err) => {
          toast({
            title: "Hata",
            description: "Destinasyon silinirken bir hata oluştu.",
            variant: "destructive"
          });
          console.error("Destinasyon silme hatası:", err);
        }
      });
    }
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      user: auth.user,
      header: "Destinasyonlar",
      actionButton: /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("admin.destinations.create"), children: "Yeni Destinasyon Ekle" }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Destinasyonlar" }),
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsx(CardTitle, { children: "Tüm Destinasyonlar" }),
            /* @__PURE__ */ jsx(CardDescription, { children: "Mevcut tüm destinasyonları buradan yönetebilirsiniz." })
          ] }),
          /* @__PURE__ */ jsxs(CardContent, { children: [
            /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs(Table, { className: "min-w-full divide-y divide-gray-200", children: [
              /* @__PURE__ */ jsx(TableHeader, { className: "bg-gray-50", children: /* @__PURE__ */ jsxs(TableRow, { children: [
                /* @__PURE__ */ jsx(TableHead, { className: "w-[100px]", children: "ID" }),
                /* @__PURE__ */ jsx(TableHead, { children: "Görsel" }),
                /* @__PURE__ */ jsx(TableHead, { children: "Adı" }),
                /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Aksiyonlar" })
              ] }) }),
              /* @__PURE__ */ jsx(TableBody, { children: destinations.length > 0 ? destinations.map((destination) => /* @__PURE__ */ jsxs(TableRow, { className: "group", children: [
                /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: destination.id }),
                /* @__PURE__ */ jsx(TableCell, { children: destination.image ? /* @__PURE__ */ jsx("img", { src: destination.image.thumbnail_url, alt: destination.name, className: "w-16 h-16 object-cover rounded-md" }) : /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-muted flex items-center justify-center rounded-md text-muted-foreground text-xs text-center", children: "Görsel Yok" }) }),
                /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
                  Link,
                  {
                    href: route("admin.destinations.edit", destination.id),
                    className: "text-black hover:underline",
                    children: destination.name
                  }
                ) }),
                /* @__PURE__ */ jsxs(TableCell, { className: "text-right flex items-center justify-end space-x-2", children: [
                  /* @__PURE__ */ jsx(Link, { href: route("destinations.show", destination.slug), target: "_blank", className: "text-muted-foreground hover:text-blue-600", children: /* @__PURE__ */ jsx(ExternalLink, { className: "h-5 w-5" }) }),
                  /* @__PURE__ */ jsx(Link, { href: route("admin.destinations.edit", destination.id), className: "text-muted-foreground hover:text-green-600", children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", children: /* @__PURE__ */ jsx(Edit$5, { className: "h-5 w-5" }) }) }),
                  /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: () => handleDelete(destination.id), className: "text-muted-foreground hover:text-red-600", children: /* @__PURE__ */ jsx(Trash2, { className: "h-5 w-5" }) })
                ] })
              ] }, destination.id)) : /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: "4", className: "text-center py-4 text-muted-foreground", children: "Henüz destinasyon bulunmamaktadır." }) }) })
            ] }) }),
            /* @__PURE__ */ jsx(Pagination, { links: initialDestinations.links })
          ] })
        ] })
      ]
    }
  );
}
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$2
}, Symbol.toStringTag, { value: "Module" }));
function OptionalActivityForm({ data, setData, errors, media_files }) {
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(data.image || null);
  const handleMediaSelect = (media) => {
    setSelectedImage(media);
    setData("image_id", media ? media.id : null);
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Aktivite Adı" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          id: "name",
          type: "text",
          name: "name",
          value: data.name,
          className: "mt-1 block w-full",
          onChange: (e2) => setData("name", e2.target.value),
          required: true
        }
      ),
      /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.name })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: "price", children: "Fiyat (€)" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          id: "price",
          type: "number",
          name: "price",
          value: data.price || "",
          className: "mt-1 block w-full",
          onChange: (e2) => setData("price", e2.target.value)
        }
      ),
      /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.price })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: "description", children: "Açıklama" }),
      /* @__PURE__ */ jsx(
        RichTextEditor$2,
        {
          value: data.description,
          onChange: (value) => setData("description", value),
          className: "mt-1"
        }
      ),
      /* @__PURE__ */ jsx(InputError, { message: errors.description, className: "mt-2" })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Label, { children: "Öne Çıkan Görsel" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-2 border rounded-md p-4 flex flex-col items-center justify-center space-y-4", children: [
        selectedImage ? /* @__PURE__ */ jsx("img", { src: selectedImage.original_url, alt: selectedImage.name, className: "max-w-full h-48 object-contain rounded-md" }) : /* @__PURE__ */ jsxs("div", { className: "text-gray-500 flex flex-col items-center", children: [
          /* @__PURE__ */ jsx(ImageIcon, { className: "h-12 w-12 text-gray-400" }),
          /* @__PURE__ */ jsx("span", { className: "mt-2", children: "Henüz bir görsel seçilmedi." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsxs(Button, { type: "button", variant: "outline", onClick: () => setIsMediaModalOpen(true), children: [
            /* @__PURE__ */ jsx(PlusCircle, { className: "mr-2 h-4 w-4" }),
            selectedImage ? "Görseli Değiştir" : "Görsel Seç"
          ] }),
          selectedImage && /* @__PURE__ */ jsxs(Button, { type: "button", variant: "destructive", onClick: () => handleMediaSelect(null), children: [
            /* @__PURE__ */ jsx(Trash2, { className: "mr-2 h-4 w-4" }),
            " Kaldır"
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          MediaManagerModal,
          {
            isOpen: isMediaModalOpen,
            onClose: () => setIsMediaModalOpen(false),
            onMediaSelect: (media) => {
              handleMediaSelect(media);
              setIsMediaModalOpen(false);
            },
            initialSelectedMedia: selectedImage,
            isMultiSelect: false,
            media: media_files
          }
        )
      ] }),
      /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.image_id })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
      /* @__PURE__ */ jsx(
        Checkbox,
        {
          id: "is_published",
          checked: data.is_published,
          onCheckedChange: (checked) => setData("is_published", checked)
        }
      ),
      /* @__PURE__ */ jsx(Label, { htmlFor: "is_published", children: "Yayınlandı" })
    ] })
  ] });
}
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: OptionalActivityForm
}, Symbol.toStringTag, { value: "Module" }));
function Create$1({ auth, media_files }) {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    description: "",
    price: "",
    is_published: false,
    image_id: null
  });
  const submit = (e2) => {
    e2.preventDefault();
    post(route("admin.optional-activities.store"));
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      user: auth.user,
      header: "Yeni Opsiyonel Aktivite Ekle",
      actionButton: /* @__PURE__ */ jsx(Button, { onClick: submit, disabled: processing, children: "Kaydet" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Yeni Opsiyonel Aktivite Ekle" }),
        /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto", children: /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsx("form", { onSubmit: submit, children: /* @__PURE__ */ jsx(
          OptionalActivityForm,
          {
            data,
            setData,
            errors,
            media_files
          }
        ) }) }) }) })
      ]
    }
  );
}
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Create$1
}, Symbol.toStringTag, { value: "Module" }));
function Edit$2({ auth, activity, media_files }) {
  const { data, setData, put, processing, errors } = useForm({
    name: activity.name || "",
    description: activity.description || "",
    price: activity.price || "",
    is_published: activity.is_published || false,
    image_id: activity.image_id || null,
    image: activity.image || null
    // Form bileşenine göndermek için
  });
  const submit = (e2) => {
    e2.preventDefault();
    put(route("admin.optional-activities.update", activity.id));
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      user: auth.user,
      header: `Opsiyonel Aktivite Düzenle: ${activity.name}`,
      actionButton: /* @__PURE__ */ jsx(Button, { onClick: submit, disabled: processing, children: "Değişiklikleri Kaydet" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: `Opsiyonel Aktivite Düzenle: ${activity.name}` }),
        /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto", children: /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsx("form", { onSubmit: submit, children: /* @__PURE__ */ jsx(
          OptionalActivityForm,
          {
            data,
            setData,
            errors,
            media_files
          }
        ) }) }) }) })
      ]
    }
  );
}
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Edit$2
}, Symbol.toStringTag, { value: "Module" }));
function Index$1({ auth, activities }) {
  const handleDelete = (id) => {
    if (confirm("Bu aktiviteyi silmek istediğinize emin misiniz?")) {
      router$1.delete(route("admin.optional-activities.destroy", id));
    }
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      user: auth.user,
      header: "Opsiyonel Aktiviteler",
      actionButton: /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("admin.optional-activities.create"), children: "Yeni Aktivite Ekle" }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Opsiyonel Aktiviteler" }),
        /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "p-4", children: [
          /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs(Table, { className: "min-w-full divide-y divide-gray-200", children: [
            /* @__PURE__ */ jsx(TableHeader, { className: "bg-gray-50", children: /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsx(TableHead, { children: "Görsel" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Aktivite Adı" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Fiyat" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Yayınlandı" }),
              /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Aksiyonlar" })
            ] }) }),
            /* @__PURE__ */ jsx(TableBody, { children: activities.data.map((activity) => /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsx(TableCell, { children: activity.image ? /* @__PURE__ */ jsx("img", { src: activity.image.thumbnail_url, alt: activity.name, className: "w-16 h-16 object-cover rounded-md" }) : /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-muted flex items-center justify-center rounded-md text-muted-foreground text-xs text-center", children: "Görsel Yok" }) }),
              /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
                Link,
                {
                  href: route("admin.optional-activities.edit", activity.id),
                  className: "text-black hover:underline",
                  children: activity.name
                }
              ) }),
              /* @__PURE__ */ jsx(TableCell, { children: activity.price ? `€${activity.price}` : "-" }),
              /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { variant: activity.is_published ? "default" : "destructive", children: activity.is_published ? "Evet" : "Hayır" }) }),
              /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end space-x-2", children: [
                /* @__PURE__ */ jsx(Link, { href: route("admin.optional-activities.edit", activity.id), className: "text-muted-foreground hover:text-green-600", children: /* @__PURE__ */ jsx(Edit$5, { className: "h-5 w-5" }) }),
                /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: () => handleDelete(activity.id), className: "text-muted-foreground hover:text-red-600", children: /* @__PURE__ */ jsx(Trash2, { className: "h-5 w-5" }) })
              ] }) })
            ] }, activity.id)) })
          ] }) }),
          /* @__PURE__ */ jsx(Pagination, { links: activities.links })
        ] }) })
      ]
    }
  );
}
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$1
}, Symbol.toStringTag, { value: "Module" }));
function Seo({ auth, settings }) {
  const { data, setData, post, processing, errors } = useForm({
    settings: {
      "seo.defaults.title": settings["seo.defaults.title"] || "",
      "seo.defaults.description": settings["seo.defaults.description"] || "",
      "seo.tours.index.title": settings["seo.tours.index.title"] || "",
      "seo.tours.index.description": settings["seo.tours.index.description"] || "",
      "seo.tour.show.title": settings["seo.tour.show.title"] || "",
      "seo.tour.show.description": settings["seo.tour.show.description"] || "",
      "seo.contents.index.title": settings["seo.contents.index.title"] || "",
      "seo.contents.index.description": settings["seo.contents.index.description"] || "",
      "seo.content.show.title": settings["seo.content.show.title"] || "",
      "seo.content.show.description": settings["seo.content.show.description"] || "",
      "seo.destinations.index.title": settings["seo.destinations.index.title"] || "",
      "seo.destinations.index.description": settings["seo.destinations.index.description"] || "",
      "seo.destination.show.title": settings["seo.destination.show.title"] || "",
      "seo.destination.show.description": settings["seo.destination.show.description"] || ""
    }
  });
  const { toast: toast2 } = useToast();
  const submit = (e2) => {
    e2.preventDefault();
    post(route("admin.settings.seo.store"), {
      onSuccess: () => {
        toast2({
          title: "Başarılı!",
          description: "SEO ayarları başarıyla kaydedildi.",
          className: "bg-green-600 text-white border-green-600"
        });
      },
      onError: () => {
        toast2({
          title: "Hata!",
          description: "Ayarlar kaydedilirken bir hata oluştu.",
          variant: "destructive"
        });
      }
    });
  };
  const handleInputChange = (key, value) => {
    setData("settings", { ...data.settings, [key]: value });
  };
  const renderSettingInput = (key, label, isTextarea = false) => /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Label, { htmlFor: key, children: label }),
    isTextarea ? /* @__PURE__ */ jsx(
      Textarea,
      {
        id: key,
        value: data.settings[key],
        onChange: (e2) => handleInputChange(key, e2.target.value),
        className: "mt-1 block w-full",
        rows: 3
      }
    ) : /* @__PURE__ */ jsx(
      Input,
      {
        id: key,
        type: "text",
        value: data.settings[key],
        onChange: (e2) => handleInputChange(key, e2.target.value),
        className: "mt-1 block w-full"
      }
    )
  ] }, key);
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      user: auth.user,
      header: "SEO Ayarları",
      actionButton: /* @__PURE__ */ jsx(Button, { onClick: submit, disabled: processing, children: "Ayarları Kaydet" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "SEO Ayarları" }),
        /* @__PURE__ */ jsx("form", { onSubmit: submit, children: /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
          /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(CardTitle, { children: "Genel SEO Ayarları" }),
              /* @__PURE__ */ jsx(CardDescription, { children: "Sitenin varsayılan başlık ve açıklama ayarları." })
            ] }),
            /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
              renderSettingInput("seo.defaults.title", "Site Başlığı"),
              renderSettingInput("seo.defaults.description", "Site Açıklaması", true)
            ] })
          ] }),
          /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(CardTitle, { children: "Tur Sayfaları" }),
              /* @__PURE__ */ jsxs(CardDescription, { children: [
                "Değişkenler: ",
                `{site_title}`,
                ", ",
                `{tour_title}`,
                ", ",
                `{tour_summary}`
              ] })
            ] }),
            /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
              renderSettingInput("seo.tours.index.title", "Tur Listeleme Sayfası Başlığı"),
              renderSettingInput("seo.tours.index.description", "Tur Listeleme Sayfası Açıklaması", true),
              renderSettingInput("seo.tour.show.title", "Tur Detay Sayfası Başlığı"),
              renderSettingInput("seo.tour.show.description", "Tur Detay Sayfası Açıklaması", true)
            ] })
          ] }),
          /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(CardTitle, { children: "İçerik Sayfaları" }),
              /* @__PURE__ */ jsxs(CardDescription, { children: [
                "Değişkenler: ",
                `{site_title}`,
                ", ",
                `{content_title}`,
                ", ",
                `{content_summary}`
              ] })
            ] }),
            /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
              renderSettingInput("seo.contents.index.title", "İçerik Listeleme Sayfası Başlığı"),
              renderSettingInput("seo.contents.index.description", "İçerik Listeleme Sayfası Açıklaması", true),
              renderSettingInput("seo.content.show.title", "İçerik Detay Sayfası Başlığı"),
              renderSettingInput("seo.content.show.description", "İçerik Detay Sayfası Açıklaması", true)
            ] })
          ] }),
          /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(CardTitle, { children: "Destinasyon Sayfaları" }),
              /* @__PURE__ */ jsxs(CardDescription, { children: [
                "Değişkenler: ",
                `{site_title}`,
                ", ",
                `{destination_name}`,
                ", ",
                `{destination_description}`
              ] })
            ] }),
            /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
              renderSettingInput("seo.destinations.index.title", "Destinasyon Listeleme Sayfası Başlığı"),
              renderSettingInput("seo.destinations.index.description", "Destinasyon Listeleme Sayfası Açıklaması", true),
              renderSettingInput("seo.destination.show.title", "Destinasyon Detay Sayfası Başlığı"),
              renderSettingInput("seo.destination.show.description", "Destinasyon Detay Sayfası Açıklaması", true)
            ] })
          ] })
        ] }) })
      ]
    }
  );
}
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Seo
}, Symbol.toStringTag, { value: "Module" }));
const Separator = React.forwardRef(
  ({
    className,
    orientation = "horizontal",
    decorative = true,
    ...props
  }, ref) => /* @__PURE__ */ jsx(
    SeparatorPrimitive.Root,
    {
      ref,
      decorative,
      orientation,
      className: cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      ),
      ...props
    }
  )
);
Separator.displayName = SeparatorPrimitive.Root.displayName;
const Accordion = AccordionPrimitive.Root;
const AccordionItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Item, { ref, className: cn("border-b", className), ...props }));
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Header, { className: "flex", children: /* @__PURE__ */ jsxs(
  AccordionPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(
        ChevronDown,
        {
          className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
        }
      )
    ]
  }
) }));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
  AccordionPrimitive.Content,
  {
    ref,
    className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ jsx("div", { className: cn("pb-4 pt-0", className), children })
  }
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
const initializePricingTiers$1 = (seasons, categories) => {
  let tiers = [];
  seasons.forEach((season) => {
    categories.forEach((category) => {
      tiers.push({
        season_name: season,
        category_name: category,
        price_per_person_1: null,
        price_per_person_2: null,
        price_per_person_3: null
      });
    });
  });
  return tiers;
};
function Create({ auth, destinations, optionalActivities, media_files, config_seasons, config_categories }) {
  const { toast: toast2 } = useToast();
  const { data, setData, post, processing, errors, reset } = useForm({
    title: "",
    slug: "",
    summary: "",
    description: "",
    is_popular: false,
    duration_days: 1,
    duration_nights: 0,
    language: "Türkçe",
    min_participants: 1,
    max_participants: 10,
    is_published: false,
    inclusions_html: "",
    exclusions_html: "",
    hotels: {},
    destinations: [],
    featured_media_id: null,
    gallery_media_ids: [],
    daily_program: [],
    pricing_tiers: initializePricingTiers$1(config_seasons, config_categories),
    optional_activity_ids: []
  });
  const [selectedFeaturedMedia, setSelectedFeaturedMedia] = useState(null);
  const [selectedGalleryMedia, setSelectedGalleryMedia] = useState([]);
  const [tempDayTitle, setTempDayTitle] = useState("");
  const [editingDayId, setEditingDayId] = useState(null);
  const [tempActivityDescription, setTempActivityDescription] = useState("");
  const [editingActivityId, setEditingActivityId] = useState(null);
  const [activeTab, setActiveTab] = useState("general-info");
  const [currentHotels, setCurrentHotels] = useState({});
  const [editingCity, setEditingCity] = useState(null);
  const [tempCityName, setTempCityName] = useState("");
  const [editingCategory, setEditingCategory] = useState({ city: null, category: null });
  const [tempCategoryName, setTempCategoryName] = useState("");
  const [isFeaturedModalOpen, setIsFeaturedModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
  const generateSlug = (text) => {
    const a = "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
    const b = "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
    const p = new RegExp(a.split("").join("|"), "g");
    return text.toString().toLowerCase().replace(/\s+/g, "-").replace(p, (c) => b.charAt(a.indexOf(c))).replace(/&/g, "-and-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
  };
  const submit = (e2) => {
    e2.preventDefault();
    const filteredData = {
      ...data,
      pricing_tiers: data.pricing_tiers.filter((tier) => tier.category_name && tier.season_name)
    };
    post(route("admin.tours.store"), filteredData, {
      onError: (errors2) => {
        let errorMessages = Object.values(errors2).flat();
        toast2({
          title: "Tur oluşturulamadı.",
          description: errorMessages.join("\n") || "Bilinmeyen bir hata oluştu.",
          variant: "destructive"
        });
      },
      onSuccess: () => {
        toast2({
          title: "Tur başarıyla oluşturuldu!",
          description: "Yeni tur başarıyla veritabanına eklendi."
        });
      }
    });
  };
  const destinationOptions = destinations.map((dest) => ({
    value: dest.id,
    label: dest.name
  }));
  const optionalActivityOptions = optionalActivities.map((activity) => ({
    value: activity.id,
    label: activity.name
  }));
  const handleDestinationSelect = (destinationId) => {
    setData((prevData) => {
      const currentDestinations = prevData.destinations || [];
      const isSelected = currentDestinations.includes(destinationId);
      if (isSelected) {
        return { ...prevData, destinations: currentDestinations.filter((id) => id !== destinationId) };
      } else {
        return { ...prevData, destinations: [...currentDestinations, destinationId] };
      }
    });
  };
  const handleOptionalActivitySelect = (activityId) => {
    setData((prevData) => {
      const currentActivities = prevData.optional_activity_ids || [];
      const isSelected = currentActivities.includes(activityId);
      if (isSelected) {
        return { ...prevData, optional_activity_ids: currentActivities.filter((id) => id !== activityId) };
      } else {
        return { ...prevData, optional_activity_ids: [...currentActivities, activityId] };
      }
    });
  };
  const addCityToHotels = (cityName) => {
    if (cityName && !currentHotels[cityName]) {
      setCurrentHotels((prev) => ({ ...prev, [cityName]: {} }));
    }
  };
  const handleCityNameChange = (oldCityName, newCityName) => {
    if (oldCityName === newCityName || !newCityName) return;
    setCurrentHotels((prev) => {
      const newHotels = {};
      Object.keys(prev).forEach((key) => {
        newHotels[key === oldCityName ? newCityName : key] = prev[key];
      });
      return newHotels;
    });
  };
  const addCategoryToCity = (cityName, categoryName) => {
    var _a;
    if (cityName && categoryName && !((_a = currentHotels[cityName]) == null ? void 0 : _a[categoryName])) {
      setCurrentHotels((prev) => ({
        ...prev,
        [cityName]: { ...prev[cityName], [categoryName]: [] }
      }));
    }
  };
  const handleCategoryNameChange = (cityName, oldCategoryName, newCategoryName) => {
    if (oldCategoryName === newCategoryName || !newCategoryName) return;
    setCurrentHotels((prev) => {
      const newHotels = { ...prev };
      if (newHotels[cityName]) {
        const newCategories = {};
        Object.keys(newHotels[cityName]).forEach((categoryKey) => {
          newCategories[categoryKey === oldCategoryName ? newCategoryName : categoryKey] = newHotels[cityName][categoryKey];
        });
        newHotels[cityName] = newCategories;
      }
      return newHotels;
    });
  };
  const addHotelToCategory = (cityName, categoryName, hotelName) => {
    if (cityName && categoryName && hotelName) {
      setCurrentHotels((prev) => {
        var _a;
        return {
          ...prev,
          [cityName]: {
            ...prev[cityName],
            [categoryName]: [...((_a = prev[cityName]) == null ? void 0 : _a[categoryName]) || [], { name: hotelName }]
          }
        };
      });
    }
  };
  const removeHotelFromCategory = (cityName, categoryName, indexToRemove) => {
    setCurrentHotels((prev) => {
      var _a;
      return {
        ...prev,
        [cityName]: {
          ...prev[cityName],
          [categoryName]: (((_a = prev[cityName]) == null ? void 0 : _a[categoryName]) || []).filter((_, index) => index !== indexToRemove)
        }
      };
    });
  };
  const removeCategoryFromCity = (cityName, categoryName) => {
    setCurrentHotels((prev) => {
      const newCities = { ...prev };
      if (newCities[cityName]) {
        delete newCities[cityName][categoryName];
        if (Object.keys(newCities[cityName]).length === 0) {
          delete newCities[cityName];
        }
      }
      return newCities;
    });
  };
  const removeCityFromHotels = (cityName) => {
    setCurrentHotels((prev) => {
      const { [cityName]: _, ...restCities } = prev;
      return restCities;
    });
  };
  useEffect(() => {
    setData("hotels", currentHotels);
  }, [currentHotels]);
  const addDay = () => {
    setData((prevData) => {
      const newDayNumber = prevData.daily_program.length > 0 ? Math.max(...prevData.daily_program.map((d) => d.day_number)) + 1 : 1;
      return {
        ...prevData,
        daily_program: [...prevData.daily_program, { id: `temp-${Date.now()}`, day_number: newDayNumber, title: `Gün ${newDayNumber}`, activities: [] }]
      };
    });
  };
  const removeDay = (idToRemove) => {
    setData((prevData) => ({ ...prevData, daily_program: prevData.daily_program.filter((day) => day.id !== idToRemove) }));
  };
  const addActivity = (dayId) => {
    setData((prevData) => ({
      ...prevData,
      daily_program: prevData.daily_program.map((day) => {
        if (day.id === dayId) {
          const newOrder = day.activities.length > 0 ? Math.max(...day.activities.map((a) => a.order)) + 1 : 0;
          return { ...day, activities: [...day.activities, { id: `temp-activity-${Date.now()}`, description: "", is_highlight: false, order: newOrder }] };
        }
        return day;
      })
    }));
  };
  const removeActivity = (dayId, activityIdToRemove) => {
    setData((prevData) => ({
      ...prevData,
      daily_program: prevData.daily_program.map((day) => {
        if (day.id === dayId) {
          return { ...day, activities: day.activities.filter((activity) => activity.id !== activityIdToRemove) };
        }
        return day;
      })
    }));
  };
  const handleActivityChange = (dayId, activityIdToUpdate, field, value) => {
    setData((prevData) => ({
      ...prevData,
      daily_program: prevData.daily_program.map((day) => {
        if (day.id === dayId) {
          return { ...day, activities: day.activities.map((activity) => activity.id === activityIdToUpdate ? { ...activity, [field]: value } : activity) };
        }
        return day;
      })
    }));
  };
  const onDayDragEnd = (result) => {
    if (!result.destination) return;
    setData((prevData) => {
      const reorderedDays = Array.from(prevData.daily_program);
      const [removed] = reorderedDays.splice(result.source.index, 1);
      reorderedDays.splice(result.destination.index, 0, removed);
      const finalReorderedDays = reorderedDays.map((day, index) => ({
        ...day,
        day_number: index + 1,
        activities: day.activities.map((activity, activityIndex) => ({ ...activity, order: activityIndex }))
      }));
      return { ...prevData, daily_program: finalReorderedDays };
    });
  };
  const onActivityDragEnd = (result) => {
    if (!result.destination || result.source.droppableId !== result.destination.droppableId) return;
    const dayId = result.source.droppableId.replace("activities-", "");
    setData((prevData) => ({
      ...prevData,
      daily_program: prevData.daily_program.map((day) => {
        if (String(day.id) === dayId) {
          const reorderedActivities = Array.from(day.activities);
          const [removed] = reorderedActivities.splice(result.source.index, 1);
          reorderedActivities.splice(result.destination.index, 0, removed);
          const finalReorderedActivities = reorderedActivities.map((activity, index) => ({ ...activity, order: index }));
          return { ...day, activities: finalReorderedActivities };
        }
        return day;
      })
    }));
  };
  const handleFeaturedMediaSelect = (media) => {
    if (!media) {
      setSelectedFeaturedMedia(null);
      setData((prevData) => ({ ...prevData, featured_media_id: null, featured_media_url: null }));
    } else {
      setSelectedFeaturedMedia(media);
      setData((prevData) => ({ ...prevData, featured_media_id: media.id, featured_media_url: media.original_url }));
    }
  };
  const handleGalleryMediaSelect = (mediaItems) => {
    setSelectedGalleryMedia(mediaItems);
    setData("gallery_media_ids", mediaItems.map((item) => item.id));
  };
  const removeGalleryMedia = (idToRemove) => {
    setSelectedGalleryMedia((prev) => prev.filter((item) => item.id !== idToRemove));
    setData((prevData) => ({
      ...prevData,
      gallery_media_ids: prevData.gallery_media_ids.filter((id) => id !== idToRemove),
      gallery_media_urls: prevData.gallery_media_urls.filter((item) => item.id !== idToRemove)
    }));
  };
  const onGalleryDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedMedia = Array.from(selectedGalleryMedia);
    const [removed] = reorderedMedia.splice(result.source.index, 1);
    reorderedMedia.splice(result.destination.index, 0, removed);
    setSelectedGalleryMedia(reorderedMedia);
    setData((prevData) => ({ ...prevData, gallery_media_urls: reorderedMedia, gallery_media_ids: reorderedMedia.map((item) => item.id) }));
  };
  const handleMatrixPriceChange = (seasonName, categoryName, priceType, value) => {
    setData((prevData) => {
      const updatedTiers = prevData.pricing_tiers.map((tier) => {
        if (tier.season_name === seasonName && tier.category_name === categoryName) {
          return { ...tier, [priceType]: parseFloat(value) || null };
        }
        return tier;
      });
      return { ...prevData, pricing_tiers: updatedTiers };
    });
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      user: auth.user,
      header: "Yeni Tur Ekle",
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Yeni Tur Ekle" }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Card, { className: "bg-white shadow-sm sm:rounded-lg px-10 py-10", children: /* @__PURE__ */ jsx(CardContent, { className: "px-0 pb-0", children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, onKeyDown: (e2) => {
          if (e2.key === "Enter") e2.preventDefault();
        }, children: [
          /* @__PURE__ */ jsxs(Tabs, { defaultValue: "general-info", onValueChange: setActiveTab, children: [
            /* @__PURE__ */ jsxs(TabsList, { className: "flex flex-wrap border-b h-auto p-0 bg-white rounded-t-lg overflow-x-auto justify-start", children: [
              /* @__PURE__ */ jsx(TabsTrigger, { value: "general-info", className: "px-4 py-3 text-sm font-medium transition-all data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:text-muted-foreground whitespace-nowrap", children: "Genel Bilgiler" }),
              /* @__PURE__ */ jsx(TabsTrigger, { value: "hotels", className: "px-4 py-3 text-sm font-medium transition-all data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:text-muted-foreground whitespace-nowrap", children: "Oteller" }),
              /* @__PURE__ */ jsx(TabsTrigger, { value: "media", className: "px-4 py-3 text-sm font-medium transition-all data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:text-muted-foreground whitespace-nowrap", children: "Görseller" }),
              /* @__PURE__ */ jsx(TabsTrigger, { value: "daily-program", className: "px-4 py-3 text-sm font-medium transition-all data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:text-muted-foreground whitespace-nowrap", children: "Günlük Program" }),
              /* @__PURE__ */ jsx(TabsTrigger, { value: "pricing", className: "px-4 py-3 text-sm font-medium transition-all data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:text-muted-foreground whitespace-nowrap", children: "Fiyatlandırma" }),
              /* @__PURE__ */ jsx(TabsTrigger, { value: "optional-activities", className: "px-4 py-3 text-sm font-medium transition-all data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:text-muted-foreground whitespace-nowrap", children: "Opsiyonel Aktiviteler" })
            ] }),
            /* @__PURE__ */ jsxs(TabsContent, { value: "general-info", className: "space-y-6 pt-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "title", children: "Tur Adı" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "title",
                      type: "text",
                      name: "title",
                      value: data.title,
                      className: "mt-1 block w-full",
                      onChange: (e2) => {
                        const newTitle = e2.target.value;
                        setData("title", newTitle);
                        if (!isSlugManuallyEdited) {
                          setData("slug", generateSlug(newTitle));
                        }
                      },
                      required: true
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.title })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "slug", children: "Slug (URL)" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "slug",
                      type: "text",
                      name: "slug",
                      value: data.slug,
                      className: "mt-1 block w-full",
                      onChange: (e2) => {
                        setData("slug", e2.target.value);
                        setIsSlugManuallyEdited(true);
                      },
                      required: true
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.slug })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "summary", children: "Kısa Özet" }),
                /* @__PURE__ */ jsx(Textarea, { id: "summary", name: "summary", value: data.summary, className: "mt-1 block w-full", onChange: (e2) => setData("summary", e2.target.value), rows: "3" }),
                /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.summary })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "description", children: "Açıklama" }),
                  /* @__PURE__ */ jsx(RichTextEditor$2, { value: data.description, onChange: (value) => setData("description", value), className: "mt-1 block w-full min-h-[200px]" }),
                  /* @__PURE__ */ jsx(InputError, { message: errors.description, className: "mt-2" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "inclusions_html", children: "Dahil Olanlar" }),
                  /* @__PURE__ */ jsx(RichTextEditor$2, { value: data.inclusions_html, onChange: (value) => setData("inclusions_html", value), className: "mt-1 block w-full min-h-[150px]" }),
                  /* @__PURE__ */ jsx(InputError, { message: errors.inclusions_html, className: "mt-2" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "exclusions_html", children: "Dahil Olmayanlar" }),
                  /* @__PURE__ */ jsx(RichTextEditor$2, { value: data.exclusions_html, onChange: (value) => setData("exclusions_html", value), className: "mt-1 block w-full min-h-[150px]" }),
                  /* @__PURE__ */ jsx(InputError, { message: errors.exclusions_html, className: "mt-2" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "language", children: "Dil" }),
                  /* @__PURE__ */ jsx(Input, { id: "language", type: "text", name: "language", value: data.language, className: "mt-1 block w-full", onChange: (e2) => setData("language", e2.target.value), required: true }),
                  /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.language })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "duration_days", children: "Gün Sayısı" }),
                  /* @__PURE__ */ jsx(Input, { id: "duration_days", type: "number", name: "duration_days", value: data.duration_days, className: "mt-1 block w-full", onChange: (e2) => setData("duration_days", parseInt(e2.target.value)), required: true }),
                  /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.duration_days })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "duration_nights", children: "Gece Sayısı" }),
                  /* @__PURE__ */ jsx(Input, { id: "duration_nights", type: "number", name: "duration_nights", value: data.duration_nights, className: "mt-1 block w-full", onChange: (e2) => setData("duration_nights", parseInt(e2.target.value)), required: true }),
                  /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.duration_nights })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "min_participants", children: "Min. Katılımcı" }),
                  /* @__PURE__ */ jsx(Input, { id: "min_participants", type: "number", name: "min_participants", value: data.min_participants, className: "mt-1 block w-full", onChange: (e2) => setData("min_participants", parseInt(e2.target.value)) }),
                  /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.min_participants })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "max_participants", children: "Maks. Katılımcı" }),
                  /* @__PURE__ */ jsx(Input, { id: "max_participants", type: "number", name: "max_participants", value: data.max_participants, className: "mt-1 block w-full", onChange: (e2) => setData("max_participants", parseInt(e2.target.value)) }),
                  /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.max_participants })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "destinations", children: "Destinasyonlar" }),
                /* @__PURE__ */ jsx(MultiSelect, { options: destinationOptions, selectedValues: data.destinations, onSelect: handleDestinationSelect, placeholder: "Destinasyon Seç" }),
                /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.destinations })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 mt-4", children: [
                /* @__PURE__ */ jsx(Checkbox, { id: "is_popular", checked: data.is_popular, onCheckedChange: (checked) => setData("is_popular", checked) }),
                /* @__PURE__ */ jsx(Label, { htmlFor: "is_popular", children: "Popüler Tur" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 mt-4", children: [
                /* @__PURE__ */ jsx(Checkbox, { id: "is_published", checked: data.is_published, onCheckedChange: (checked) => setData("is_published", checked) }),
                /* @__PURE__ */ jsx(Label, { htmlFor: "is_published", children: "Yayınlandı" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(TabsContent, { value: "hotels", className: "space-y-6 pt-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Otel Bilgileri" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Her şehir ve kategori için otel listelerini yönetin." }),
              /* @__PURE__ */ jsx(Accordion, { type: "multiple", className: "w-full space-y-4", children: Object.keys(currentHotels).map((cityName) => /* @__PURE__ */ jsxs(AccordionItem, { value: cityName, className: "border rounded-lg px-4 pt-4", children: [
                /* @__PURE__ */ jsxs(AccordionTrigger, { className: "flex items-center justify-between font-bold text-base capitalize hover:no-underline p-0", children: [
                  editingCity === cityName ? /* @__PURE__ */ jsx(
                    Input,
                    {
                      type: "text",
                      value: tempCityName,
                      onChange: (e2) => setTempCityName(e2.target.value),
                      onBlur: () => {
                        handleCityNameChange(cityName, tempCityName.toLowerCase());
                        setEditingCity(null);
                      },
                      onKeyDown: (e2) => {
                        if (e2.key === "Enter") {
                          handleCityNameChange(cityName, tempCityName.toLowerCase());
                          setEditingCity(null);
                        }
                      },
                      autoFocus: true,
                      className: "text-lg font-semibold capitalize"
                    }
                  ) : /* @__PURE__ */ jsx(CardTitle, { className: "capitalize cursor-pointer text-lg font-semibold", onDoubleClick: () => setEditingCity(cityName), children: cityName }),
                  /* @__PURE__ */ jsx("div", { className: "ml-auto p-2 rounded-full hover:bg-red-100 text-red-600 cursor-pointer", onClick: (e2) => {
                    e2.stopPropagation();
                    removeCityFromHotels(cityName);
                  }, children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
                ] }),
                /* @__PURE__ */ jsxs(AccordionContent, { className: "pt-3 pb-0", children: [
                  /* @__PURE__ */ jsx(Input, { type: "text", placeholder: "Yeni Kategori Ekle (Örn: Deluxe)", onKeyDown: (e2) => {
                    if (e2.key === "Enter") {
                      e2.preventDefault();
                      addCategoryToCity(cityName, e2.target.value);
                      e2.target.value = "";
                    }
                  }, className: "w-60 mb-3" }),
                  /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3", children: (currentHotels[cityName] && Object.keys(currentHotels[cityName]) || []).map((categoryName) => /* @__PURE__ */ jsxs("div", { className: "border rounded-md p-3", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                      editingCategory.city === cityName && editingCategory.category === categoryName ? /* @__PURE__ */ jsx(Input, { type: "text", value: tempCategoryName, onChange: (e2) => setTempCategoryName(e2.target.value), onBlur: () => {
                        handleCategoryNameChange(cityName, categoryName, tempCategoryName);
                        setEditingCategory({ city: null, category: null });
                      }, onKeyDown: (e2) => {
                        if (e2.key === "Enter") {
                          handleCategoryNameChange(cityName, categoryName, tempCategoryName);
                          setEditingCategory({ city: null, category: null });
                        }
                      }, autoFocus: true, className: "font-semibold text-sm capitalize" }) : /* @__PURE__ */ jsx("h4", { className: "font-semibold text-sm capitalize cursor-pointer", onDoubleClick: () => setEditingCategory({ city: cityName, category: categoryName }), children: categoryName }),
                      /* @__PURE__ */ jsx("div", { className: "p-1 rounded-full hover:bg-red-100 text-red-600 cursor-pointer", onClick: (e2) => {
                        e2.stopPropagation();
                        removeCategoryFromCity(cityName, categoryName);
                      }, children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "space-y-2 mb-3", children: (currentHotels[cityName][categoryName] || []).map((hotel, hotelIndex) => /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                      /* @__PURE__ */ jsx(Input, { type: "text", value: hotel.name, onChange: (e2) => {
                        const newHotels = { ...currentHotels };
                        newHotels[cityName][categoryName][hotelIndex].name = e2.target.value;
                        setCurrentHotels(newHotels);
                      }, placeholder: "Otel Adı", className: "flex-1" }),
                      /* @__PURE__ */ jsx(Button, { variant: "destructive", size: "icon", onClick: () => removeHotelFromCategory(cityName, categoryName, hotelIndex), children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
                    ] }, hotelIndex)) }),
                    /* @__PURE__ */ jsx(Input, { type: "text", placeholder: "Yeni Otel Adı Ekle", onKeyDown: (e2) => {
                      if (e2.key === "Enter") {
                        addHotelToCategory(cityName, categoryName, e2.target.value);
                        e2.target.value = "";
                      }
                    }, className: "w-full" })
                  ] }, `${cityName}-${categoryName}`)) })
                ] })
              ] }, cityName)) }),
              /* @__PURE__ */ jsx(Input, { type: "text", placeholder: "Yeni Şehir Ekle (Örn: istanbul)", onKeyDown: (e2) => {
                if (e2.key === "Enter") {
                  e2.preventDefault();
                  addCityToHotels(e2.target.value.toLowerCase());
                  e2.target.value = "";
                }
              }, className: "w-full" })
            ] }),
            /* @__PURE__ */ jsxs(TabsContent, { value: "media", className: "space-y-6 pt-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Tur Görsel Yönetimi" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Öne çıkan görseli ve galeri görsellerini buradan yönetin." }),
              /* @__PURE__ */ jsx(Separator, {}),
              /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
                /* @__PURE__ */ jsx(Label, { children: "Öne Çıkan Görsel" }),
                /* @__PURE__ */ jsxs("div", { className: "mt-2 border rounded-md p-4 flex flex-col items-center justify-center space-y-4", children: [
                  selectedFeaturedMedia ? /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: selectedFeaturedMedia.original_url,
                      alt: selectedFeaturedMedia.name || selectedFeaturedMedia.file_name,
                      className: "max-w-full h-48 object-contain rounded-md"
                    }
                  ) : /* @__PURE__ */ jsxs("div", { className: "text-gray-500 flex flex-col items-center", children: [
                    /* @__PURE__ */ jsx(ImageIcon, { className: "h-12 w-12 text-gray-400" }),
                    /* @__PURE__ */ jsx("span", { className: "mt-2", children: "Henüz bir görsel seçilmedi." })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                    /* @__PURE__ */ jsxs(Button, { type: "button", variant: "outline", onClick: () => setIsFeaturedModalOpen(true), children: [
                      /* @__PURE__ */ jsx(PlusCircle, { className: "mr-2 h-4 w-4" }),
                      selectedFeaturedMedia ? "Görseli Değiştir" : "Görsel Seç"
                    ] }),
                    selectedFeaturedMedia && /* @__PURE__ */ jsxs(Button, { type: "button", variant: "destructive", onClick: () => handleFeaturedMediaSelect(null), children: [
                      /* @__PURE__ */ jsx(Trash2, { className: "mr-2 h-4 w-4" }),
                      " Kaldır"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx(
                    MediaManagerModal,
                    {
                      isOpen: isFeaturedModalOpen,
                      onClose: () => setIsFeaturedModalOpen(false),
                      onMediaSelect: (media) => {
                        handleFeaturedMediaSelect(media);
                        setIsFeaturedModalOpen(false);
                      },
                      initialSelectedMedia: selectedFeaturedMedia,
                      isMultiSelect: false,
                      media: media_files
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.featured_media_id })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
                /* @__PURE__ */ jsx(Label, { children: "Galeri Görselleri" }),
                /* @__PURE__ */ jsx(DragDropContext, { onDragEnd: onGalleryDragEnd, children: /* @__PURE__ */ jsx(Droppable, { droppableId: "gallery-media", direction: "horizontal", children: (provided) => /* @__PURE__ */ jsxs(
                  "div",
                  {
                    ...provided.droppableProps,
                    ref: provided.innerRef,
                    className: "mt-2 border rounded-md p-4 flex flex-wrap gap-4 items-start",
                    children: [
                      selectedGalleryMedia.length > 0 ? selectedGalleryMedia.map((media, index) => /* @__PURE__ */ jsx(Draggable, { draggableId: media.id.toString(), index, children: (provided2) => /* @__PURE__ */ jsxs(
                        "div",
                        {
                          ref: provided2.innerRef,
                          ...provided2.draggableProps,
                          ...provided2.dragHandleProps,
                          className: "relative group w-32 h-32",
                          children: [
                            /* @__PURE__ */ jsx(
                              "img",
                              {
                                src: media.thumbnail_url,
                                alt: media.name || media.file_name,
                                className: "w-full h-full object-cover rounded-md"
                              }
                            ),
                            /* @__PURE__ */ jsx(
                              Button,
                              {
                                variant: "destructive",
                                size: "icon",
                                className: "absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity",
                                onClick: () => removeGalleryMedia(media.id),
                                children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
                              }
                            )
                          ]
                        }
                      ) }, media.id)) : /* @__PURE__ */ jsxs("div", { className: "text-gray-500 flex flex-col items-center w-full", children: [
                        /* @__PURE__ */ jsx(ImageIcon, { className: "h-12 w-12 text-gray-400" }),
                        /* @__PURE__ */ jsx("span", { className: "mt-2", children: "Henüz galeri görseli seçilmedi." })
                      ] }),
                      provided.placeholder
                    ]
                  }
                ) }) }),
                /* @__PURE__ */ jsxs(Button, { type: "button", variant: "outline", onClick: () => setIsGalleryModalOpen(true), className: "mt-4", children: [
                  /* @__PURE__ */ jsx(PlusCircle, { className: "mr-2 h-4 w-4" }),
                  " Galeri Görseli Ekle"
                ] }),
                /* @__PURE__ */ jsx(
                  MediaManagerModal,
                  {
                    isOpen: isGalleryModalOpen,
                    onClose: () => setIsGalleryModalOpen(false),
                    onMediaSelect: (items) => {
                      handleGalleryMediaSelect(items);
                      setIsGalleryModalOpen(false);
                    },
                    initialSelectedMedia: selectedGalleryMedia,
                    isMultiSelect: true,
                    media: media_files
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.gallery_media_ids })
            ] }),
            /* @__PURE__ */ jsxs(TabsContent, { value: "daily-program", className: "space-y-6 pt-4 daily-program-content", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Günlük Tur Programı" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Turunuzun gün gün detaylı programını buradan yönetin." }),
              /* @__PURE__ */ jsx(DragDropContext, { onDragEnd: onDayDragEnd, children: /* @__PURE__ */ jsx(Droppable, { droppableId: "days", children: (provided) => /* @__PURE__ */ jsx("div", { ...provided.droppableProps, ref: provided.innerRef, className: "space-y-4", children: /* @__PURE__ */ jsxs(Accordion, { type: "multiple", className: "w-full space-y-4", children: [
                data.daily_program.length > 0 ? data.daily_program.map((day, dayIndex) => /* @__PURE__ */ jsx(Draggable, { draggableId: day.id.toString(), index: dayIndex, children: (provided2) => /* @__PURE__ */ jsxs(AccordionItem, { value: `day-${day.id}`, ref: provided2.innerRef, ...provided2.draggableProps, className: "border rounded-lg px-4 pt-4 daily-program-day-item", children: [
                  /* @__PURE__ */ jsxs(AccordionTrigger, { className: "flex items-center justify-between font-bold text-base hover:no-underline p-0 capitalize", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx("span", { ...provided2.dragHandleProps, children: /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5 text-gray-400 cursor-grab" }) }),
                      /* @__PURE__ */ jsxs(CardTitle, { className: "capitalize cursor-pointer text-lg font-semibold flex-1", children: [
                        "Gün ",
                        day.day_number,
                        ": ",
                        day.title
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "ml-auto p-2 rounded-full hover:bg-red-100 text-red-600 cursor-pointer", onClick: (e2) => {
                      e2.stopPropagation();
                      removeDay(day.id);
                    }, children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
                  ] }),
                  /* @__PURE__ */ jsxs(AccordionContent, { className: "pt-3 pb-0", children: [
                    /* @__PURE__ */ jsx(DragDropContext, { onDragEnd: (result) => onActivityDragEnd(result, day.id), children: /* @__PURE__ */ jsx(Droppable, { droppableId: `activities-${day.id}`, children: (providedActivities) => /* @__PURE__ */ jsxs("div", { ...providedActivities.droppableProps, ref: providedActivities.innerRef, className: "space-y-4", children: [
                      day.activities.length > 0 ? day.activities.map((activity, activityIndex) => /* @__PURE__ */ jsx(Draggable, { draggableId: activity.id.toString(), index: activityIndex, children: (providedActivity) => /* @__PURE__ */ jsxs("div", { ref: providedActivity.innerRef, ...providedActivity.draggableProps, ...providedActivity.dragHandleProps, className: "border rounded-md p-3 relative daily-program-activity-item", children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                          /* @__PURE__ */ jsx("span", { ...providedActivity.dragHandleProps, children: /* @__PURE__ */ jsx(Menu, { className: "h-4 w-4 text-gray-400 cursor-grab" }) }),
                          /* @__PURE__ */ jsxs(Label, { className: "flex items-center", children: [
                            /* @__PURE__ */ jsx(Checkbox, { checked: activity.is_highlight, onCheckedChange: (checked) => handleActivityChange(day.id, activity.id, "is_highlight", checked), className: "mr-2" }),
                            /* @__PURE__ */ jsx(Lightbulb, { className: "h-4 w-4 mr-1 text-yellow-500" }),
                            " Günün Etkinliği"
                          ] }),
                          /* @__PURE__ */ jsx("div", { className: "ml-auto p-1 rounded-full hover:bg-red-100 text-red-600 cursor-pointer", onClick: () => removeActivity(day.id, activity.id), children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                          /* @__PURE__ */ jsx(Label, { htmlFor: `activity-description-${day.id}-${activity.id}`, children: "Aktivite Açıklaması" }),
                          /* @__PURE__ */ jsx(RichTextEditor$2, { value: activity.description || "", onChange: (value) => handleActivityChange(day.id, activity.id, "description", value), className: "mt-1 block w-full min-h-[100px]" }),
                          /* @__PURE__ */ jsx(InputError, { message: errors[`daily_program.${dayIndex}.activities.${activityIndex}.description`], className: "mt-2" })
                        ] })
                      ] }) }, activity.id)) : /* @__PURE__ */ jsx("p", { className: "text-center text-gray-500", children: "Bu gün için henüz bir aktivite yok." }),
                      providedActivities.placeholder
                    ] }) }) }),
                    /* @__PURE__ */ jsxs(Button, { type: "button", onClick: () => addActivity(day.id), variant: "outline", className: "mt-4", children: [
                      /* @__PURE__ */ jsx(PlusCircle, { className: "mr-2 h-4 w-4" }),
                      " Aktivite Ekle"
                    ] })
                  ] })
                ] }, day.id) }, day.id)) : /* @__PURE__ */ jsx("p", { className: "text-center text-gray-500", children: "Henüz günlük program tanımlanmadı." }),
                provided.placeholder
              ] }) }) }) }),
              /* @__PURE__ */ jsxs(Button, { type: "button", onClick: addDay, className: "mt-4", children: [
                /* @__PURE__ */ jsx(PlusCircle, { className: "mr-2 h-4 w-4" }),
                " Yeni Gün Ekle"
              ] })
            ] }),
            /* @__PURE__ */ jsxs(TabsContent, { value: "pricing", className: "space-y-6 pt-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Tur Fiyatlandırması" }),
              /* @__PURE__ */ jsx("div", { className: "overflow-x-auto mt-4", children: /* @__PURE__ */ jsxs("table", { className: "w-full border-collapse", children: [
                /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b bg-muted/50", children: [
                  /* @__PURE__ */ jsx("th", { className: "px-3 py-2 text-start text-sm font-medium sticky left-0 bg-muted/50 z-10", children: "Sezon / Kategori" }),
                  config_categories.map((category) => /* @__PURE__ */ jsx("th", { className: "px-3 py-2 text-center text-sm font-medium border-l", children: category }, category))
                ] }) }),
                /* @__PURE__ */ jsx("tbody", { children: config_seasons.map((season) => /* @__PURE__ */ jsxs("tr", { className: "border-b last:border-b-0 hover:bg-muted/50", children: [
                  /* @__PURE__ */ jsx("td", { className: "px-3 py-2 text-sm font-medium sticky left-0 bg-background z-10 border-r", children: /* @__PURE__ */ jsx("span", { className: "font-semibold", children: season }) }),
                  config_categories.map((category) => {
                    const tier = data.pricing_tiers.find((t) => t.season_name === season && t.category_name === category) || {};
                    return /* @__PURE__ */ jsx("td", { className: "px-3 py-2 text-left text-sm border-l", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-1", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsx("label", { className: "text-xs w-12", children: "1 Kişi:" }),
                        /* @__PURE__ */ jsx(Input, { type: "number", step: "0.01", value: tier.price_per_person_1 || "", onChange: (e2) => handleMatrixPriceChange(season, category, "price_per_person_1", e2.target.value), className: "w-[80px]", placeholder: "-" })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsx("label", { className: "text-xs w-12", children: "2 Kişi:" }),
                        /* @__PURE__ */ jsx(Input, { type: "number", step: "0.01", value: tier.price_per_person_2 || "", onChange: (e2) => handleMatrixPriceChange(season, category, "price_per_person_2", e2.target.value), className: "w-[80px]", placeholder: "-" })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsx("label", { className: "text-xs w-12", children: "3 Kişi:" }),
                        /* @__PURE__ */ jsx(Input, { type: "number", step: "0.01", value: tier.price_per_person_3 || "", onChange: (e2) => handleMatrixPriceChange(season, category, "price_per_person_3", e2.target.value), className: "w-[80px]", placeholder: "-" })
                      ] })
                    ] }) }, `${season}-${category}`);
                  })
                ] }, season)) })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxs(TabsContent, { value: "optional-activities", className: "space-y-6 pt-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Opsiyonel Aktiviteler" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "optional_activities", children: "Aktiviteler" }),
                /* @__PURE__ */ jsx(MultiSelect, { options: optionalActivityOptions, selectedValues: data.optional_activity_ids, onSelect: handleOptionalActivitySelect, placeholder: "Aktivite Seç" }),
                /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.optional_activity_ids })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex justify-start mt-6", children: /* @__PURE__ */ jsx(Button, { type: "submit", disabled: processing, children: "Turu Kaydet" }) })
        ] }) }) }) })
      ]
    }
  );
}
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Create
}, Symbol.toStringTag, { value: "Module" }));
const RichTextEditor = lazy(() => Promise.resolve().then(() => RichTextEditor$3));
const isBrowser = typeof window !== "undefined";
const initializePricingTiers = (seasons, categories, existingTiers = []) => {
  let tiers = [];
  seasons.forEach((season) => {
    categories.forEach((category) => {
      const existingTier = existingTiers.find((t) => t.season_name === season && t.category_name === category);
      if (existingTier) {
        tiers.push(existingTier);
      } else {
        tiers.push({
          id: `temp-tier-${Date.now()}-${season}-${category}`,
          season_name: season,
          category_name: category,
          price_per_person_1: null,
          price_per_person_2: null,
          price_per_person_3: null
        });
      }
    });
  });
  return tiers;
};
function Edit$1({ auth, tour, destinations, optionalActivities, media_files, config_seasons, config_categories }) {
  var _a;
  const { toast: toast2 } = useToast();
  const { data, setData, put, processing, errors } = useForm({
    title: tour.title || "",
    slug: tour.slug || "",
    summary: tour.summary || "",
    description: tour.description || "",
    is_popular: tour.is_popular || false,
    duration_days: tour.duration_days || 0,
    duration_nights: tour.duration_nights || 0,
    language: tour.language || "Türkçe",
    min_participants: tour.min_participants || 0,
    max_participants: tour.max_participants || 0,
    is_published: tour.is_published || false,
    inclusions_html: tour.inclusions_html || "",
    exclusions_html: tour.exclusions_html || "",
    hotels: typeof tour.hotels === "string" ? JSON.parse(tour.hotels) : tour.hotels || {},
    destinations: tour.destinations ? tour.destinations.map((d) => d.id) : [],
    featured_media_id: ((_a = tour.featured_media) == null ? void 0 : _a.id) || null,
    gallery_media_ids: Array.isArray(tour.gallery_media_ids) ? tour.gallery_media_ids : [],
    daily_program: (tour.tour_days || []).map((day) => ({ ...day, activities: day.day_activities || [] })),
    pricing_tiers: initializePricingTiers(config_seasons, config_categories, tour.pricing_tiers || []),
    optional_activity_ids: tour.optional_activities ? tour.optional_activities.map((oa) => oa.id) : [],
    meta_title: tour.meta_title || "",
    meta_description: tour.meta_description || ""
  });
  const [selectedFeaturedMedia, setSelectedFeaturedMedia] = useState(tour.featured_media || null);
  const [selectedGalleryMedia, setSelectedGalleryMedia] = useState(Array.isArray(tour.gallery_images_urls) ? tour.gallery_images_urls : []);
  const [activeTab, setActiveTab] = useState("general-info");
  const [currentHotels, setCurrentHotels] = useState(typeof tour.hotels === "string" ? JSON.parse(tour.hotels) : tour.hotels || {});
  const [editingCity, setEditingCity] = useState(null);
  const [tempCityName, setTempCityName] = useState("");
  const [editingCategory, setEditingCategory] = useState({ city: null, category: null });
  const [tempCategoryName, setTempCategoryName] = useState("");
  const [isFeaturedModalOpen, setIsFeaturedModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(true);
  const generateSlug = (text) => {
    const a = "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
    const b = "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
    const p = new RegExp(a.split("").join("|"), "g");
    return text.toString().toLowerCase().replace(/\s+/g, "-").replace(p, (c) => b.charAt(a.indexOf(c))).replace(/&/g, "-and-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
  };
  const submit = (e2) => {
    e2.preventDefault();
    const dataToSubmit = { ...data };
    put(route("admin.tours.update", tour.id), {
      data: dataToSubmit,
      onError: (errors2) => {
        let errorMessages = Object.values(errors2).flat();
        toast2({
          title: "Tur güncellenemedi.",
          description: errorMessages.join("\n") || "Bilinmeyen bir hata oluştu.",
          variant: "destructive"
        });
      },
      onSuccess: () => {
        toast2({
          title: "Tur başarıyla güncellendi!",
          description: "Değişiklikler kaydedildi."
        });
      }
    });
  };
  const destinationOptions = destinations.map((dest) => ({ value: dest.id, label: dest.name }));
  const optionalActivityOptions = optionalActivities.map((activity) => ({ value: activity.id, label: activity.name }));
  const handleDestinationSelect = (destinationId) => {
    setData((prevData) => {
      const currentDestinations = prevData.destinations || [];
      const isSelected = currentDestinations.includes(destinationId);
      return { ...prevData, destinations: isSelected ? currentDestinations.filter((id) => id !== destinationId) : [...currentDestinations, destinationId] };
    });
  };
  const handleOptionalActivitySelect = (activityId) => {
    setData((prevData) => {
      const currentActivities = prevData.optional_activity_ids || [];
      const isSelected = currentActivities.includes(activityId);
      return { ...prevData, optional_activity_ids: isSelected ? currentActivities.filter((id) => id !== activityId) : [...currentActivities, activityId] };
    });
  };
  const addCityToHotels = (cityName) => {
    if (cityName && !currentHotels[cityName]) setCurrentHotels((prev) => ({ ...prev, [cityName]: {} }));
  };
  const addCategoryToCity = (cityName, categoryName) => {
    var _a2;
    if (cityName && categoryName && !((_a2 = currentHotels[cityName]) == null ? void 0 : _a2[categoryName])) {
      setCurrentHotels((prev) => ({ ...prev, [cityName]: { ...prev[cityName], [categoryName]: [] } }));
    }
  };
  const addHotelToCategory = (cityName, categoryName, hotelName) => {
    if (cityName && categoryName && hotelName) {
      setCurrentHotels((prev) => {
        var _a2;
        return { ...prev, [cityName]: { ...prev[cityName], [categoryName]: [...((_a2 = prev[cityName]) == null ? void 0 : _a2[categoryName]) || [], { name: hotelName }] } };
      });
    }
  };
  const removeHotelFromCategory = (cityName, categoryName, indexToRemove) => {
    setCurrentHotels((prev) => {
      var _a2;
      return { ...prev, [cityName]: { ...prev[cityName], [categoryName]: (((_a2 = prev[cityName]) == null ? void 0 : _a2[categoryName]) || []).filter((_, index) => index !== indexToRemove) } };
    });
  };
  const removeCategoryFromCity = (cityName, categoryName) => {
    setCurrentHotels((prev) => {
      const newCities = { ...prev };
      if (newCities[cityName]) {
        delete newCities[cityName][categoryName];
        if (Object.keys(newCities[cityName]).length === 0) delete newCities[cityName];
      }
      return newCities;
    });
  };
  const removeCityFromHotels = (cityName) => {
    setCurrentHotels((prev) => {
      const { [cityName]: _, ...restCities } = prev;
      return restCities;
    });
  };
  useEffect(() => {
    setData("hotels", currentHotels);
  }, [currentHotels]);
  const addDay = () => {
    setData((prevData) => {
      const newDayNumber = prevData.daily_program.length > 0 ? Math.max(...prevData.daily_program.map((d) => d.day_number)) + 1 : 1;
      return { ...prevData, daily_program: [...prevData.daily_program, { id: `temp-day-${Date.now()}`, day_number: newDayNumber, title: `Yeni Gün`, activities: [] }] };
    });
  };
  const removeDay = (idToRemove) => {
    setData((prevData) => ({ ...prevData, daily_program: prevData.daily_program.filter((day) => day.id !== idToRemove) }));
  };
  const handleDayTitleChange = (idToUpdate, newTitle) => {
    setData((prevData) => ({ ...prevData, daily_program: prevData.daily_program.map((day) => day.id === idToUpdate ? { ...day, title: newTitle } : day) }));
  };
  const addActivity = (dayId) => {
    setData((prevData) => ({ ...prevData, daily_program: prevData.daily_program.map((day) => {
      if (day.id === dayId) {
        const newOrder = day.activities.length > 0 ? Math.max(...day.activities.map((a) => a.order)) + 1 : 0;
        return { ...day, activities: [...day.activities, { id: `temp-activity-${Date.now()}`, description: "", is_highlight: false, order: newOrder }] };
      }
      return day;
    }) }));
  };
  const removeActivity = (dayId, activityIdToRemove) => {
    setData((prevData) => ({ ...prevData, daily_program: prevData.daily_program.map((day) => {
      if (day.id === dayId) return { ...day, activities: day.activities.filter((activity) => activity.id !== activityIdToRemove) };
      return day;
    }) }));
  };
  const handleActivityChange = (dayId, activityIdToUpdate, field, value) => {
    setData((prevData) => ({ ...prevData, daily_program: prevData.daily_program.map((day) => {
      if (day.id === dayId) return { ...day, activities: day.activities.map((activity) => activity.id === activityIdToUpdate ? { ...activity, [field]: value } : activity) };
      return day;
    }) }));
  };
  const onDayDragEnd = (result) => {
    if (!result.destination) return;
    setData((prevData) => {
      const reorderedDays = Array.from(prevData.daily_program);
      const [removed] = reorderedDays.splice(result.source.index, 1);
      reorderedDays.splice(result.destination.index, 0, removed);
      const finalReorderedDays = reorderedDays.map((day, index) => ({ ...day, day_number: index + 1, activities: day.activities.map((activity, activityIndex) => ({ ...activity, order: activityIndex })) }));
      return { ...prevData, daily_program: finalReorderedDays };
    });
  };
  const onActivityDragEnd = (result) => {
    if (!result.destination || result.source.droppableId !== result.destination.droppableId) return;
    const dayId = result.source.droppableId.replace("activities-", "");
    setData((prevData) => ({ ...prevData, daily_program: prevData.daily_program.map((day) => {
      if (String(day.id) === dayId) {
        const reorderedActivities = Array.from(day.activities);
        const [removed] = reorderedActivities.splice(result.source.index, 1);
        reorderedActivities.splice(result.destination.index, 0, removed);
        const finalReorderedActivities = reorderedActivities.map((activity, index) => ({ ...activity, order: index }));
        return { ...day, activities: finalReorderedActivities };
      }
      return day;
    }) }));
  };
  const handleFeaturedMediaSelect = (media) => {
    if (!media) {
      setSelectedFeaturedMedia(null);
      setData((prevData) => ({ ...prevData, featured_media_id: null }));
    } else {
      setSelectedFeaturedMedia(media);
      setData((prevData) => ({ ...prevData, featured_media_id: media.id }));
    }
  };
  const handleGalleryMediaSelect = (mediaItems) => {
    setSelectedGalleryMedia(mediaItems);
    setData("gallery_media_ids", mediaItems.map((item) => item.id));
  };
  const removeGalleryMedia = (idToRemove) => {
    const updatedMedia = selectedGalleryMedia.filter((item) => item.id !== idToRemove);
    setSelectedGalleryMedia(updatedMedia);
    setData("gallery_media_ids", updatedMedia.map((item) => item.id));
  };
  const onGalleryDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedMedia = Array.from(selectedGalleryMedia);
    const [removed] = reorderedMedia.splice(result.source.index, 1);
    reorderedMedia.splice(result.destination.index, 0, removed);
    setSelectedGalleryMedia(reorderedMedia);
    setData("gallery_media_ids", reorderedMedia.map((item) => item.id));
  };
  const handleMatrixPriceChange = (seasonName, categoryName, priceType, value) => {
    setData("pricing_tiers", data.pricing_tiers.map((tier) => {
      if (tier.season_name === seasonName && tier.category_name === categoryName) {
        return { ...tier, [priceType]: parseFloat(value) || null };
      }
      return tier;
    }));
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      user: auth.user,
      header: `Tur Düzenle: ${tour.title}`,
      children: [
        /* @__PURE__ */ jsx(Head, { title: `Tur Düzenle: ${tour.title}` }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Card, { className: "bg-white shadow-sm sm:rounded-lg px-10 py-10", children: /* @__PURE__ */ jsx(CardContent, { className: "px-0 pb-0", children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, onKeyDown: (e2) => {
          if (e2.key === "Enter") e2.preventDefault();
        }, children: [
          /* @__PURE__ */ jsxs(Tabs, { defaultValue: "general-info", onValueChange: setActiveTab, children: [
            /* @__PURE__ */ jsxs(TabsList, { className: "flex flex-wrap border-b h-auto p-0 bg-white rounded-t-lg overflow-x-auto justify-start", children: [
              /* @__PURE__ */ jsx(TabsTrigger, { value: "general-info", className: "px-4 py-3 text-sm font-medium transition-all data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:text-muted-foreground whitespace-nowrap", children: "Genel Bilgiler" }),
              /* @__PURE__ */ jsx(TabsTrigger, { value: "hotels", className: "px-4 py-3 text-sm font-medium transition-all data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:text-muted-foreground whitespace-nowrap", children: "Oteller" }),
              /* @__PURE__ */ jsx(TabsTrigger, { value: "media", className: "px-4 py-3 text-sm font-medium transition-all data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:text-muted-foreground whitespace-nowrap", children: "Görseller" }),
              /* @__PURE__ */ jsx(TabsTrigger, { value: "daily-program", className: "px-4 py-3 text-sm font-medium transition-all data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:text-muted-foreground whitespace-nowrap", children: "Günlük Program" }),
              /* @__PURE__ */ jsx(TabsTrigger, { value: "pricing", className: "px-4 py-3 text-sm font-medium transition-all data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:text-muted-foreground whitespace-nowrap", children: "Fiyatlandırma" }),
              /* @__PURE__ */ jsx(TabsTrigger, { value: "optional-activities", className: "px-4 py-3 text-sm font-medium transition-all data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:text-muted-foreground whitespace-nowrap", children: "Opsiyonel Aktiviteler" }),
              /* @__PURE__ */ jsx(TabsTrigger, { value: "seo", className: "px-4 py-3 text-sm font-medium transition-all data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:text-muted-foreground whitespace-nowrap", children: "SEO Ayarları" })
            ] }),
            /* @__PURE__ */ jsxs(TabsContent, { value: "general-info", className: "space-y-6 pt-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "title", children: "Tur Adı" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "title",
                      type: "text",
                      name: "title",
                      value: data.title,
                      className: "mt-1 block w-full",
                      onChange: (e2) => {
                        const newTitle = e2.target.value;
                        setData("title", newTitle);
                        if (!isSlugManuallyEdited) {
                          setData("slug", generateSlug(newTitle));
                        }
                      },
                      required: true
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.title })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "slug", children: "Slug (URL)" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "slug",
                      type: "text",
                      name: "slug",
                      value: data.slug,
                      className: "mt-1 block w-full",
                      onChange: (e2) => {
                        setData("slug", e2.target.value);
                        setIsSlugManuallyEdited(true);
                      },
                      required: true
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.slug })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "summary", children: "Kısa Özet" }),
                /* @__PURE__ */ jsx(Textarea, { id: "summary", name: "summary", value: data.summary, className: "mt-1 block w-full", onChange: (e2) => setData("summary", e2.target.value), rows: "3" }),
                /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.summary })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "description", children: "Açıklama" }),
                  isBrowser && /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { children: "Yükleniyor..." }), children: /* @__PURE__ */ jsx(RichTextEditor, { value: data.description, onChange: (value) => setData("description", value), className: "mt-1 block w-full min-h-[200px]" }) }),
                  /* @__PURE__ */ jsx(InputError, { message: errors.description, className: "mt-2" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "inclusions_html", children: "Dahil Olanlar" }),
                  isBrowser && /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { children: "Yükleniyor..." }), children: /* @__PURE__ */ jsx(RichTextEditor, { value: data.inclusions_html, onChange: (value) => setData("inclusions_html", value), className: "mt-1 block w-full min-h-[150px]" }) }),
                  /* @__PURE__ */ jsx(InputError, { message: errors.inclusions_html, className: "mt-2" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "exclusions_html", children: "Dahil Olmayanlar" }),
                  isBrowser && /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { children: "Yükleniyor..." }), children: /* @__PURE__ */ jsx(RichTextEditor, { value: data.exclusions_html, onChange: (value) => setData("exclusions_html", value), className: "mt-1 block w-full min-h-[150px]" }) }),
                  /* @__PURE__ */ jsx(InputError, { message: errors.exclusions_html, className: "mt-2" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "language", children: "Dil" }),
                  /* @__PURE__ */ jsx(Input, { id: "language", type: "text", name: "language", value: data.language, className: "mt-1 block w-full", onChange: (e2) => setData("language", e2.target.value), required: true }),
                  /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.language })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "duration_days", children: "Gün Sayısı" }),
                  /* @__PURE__ */ jsx(Input, { id: "duration_days", type: "number", name: "duration_days", value: data.duration_days, className: "mt-1 block w-full", onChange: (e2) => setData("duration_days", parseInt(e2.target.value)), required: true }),
                  /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.duration_days })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "duration_nights", children: "Gece Sayısı" }),
                  /* @__PURE__ */ jsx(Input, { id: "duration_nights", type: "number", name: "duration_nights", value: data.duration_nights, className: "mt-1 block w-full", onChange: (e2) => setData("duration_nights", parseInt(e2.target.value)), required: true }),
                  /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.duration_nights })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "min_participants", children: "Min. Katılımcı" }),
                  /* @__PURE__ */ jsx(Input, { id: "min_participants", type: "number", name: "min_participants", value: data.min_participants, className: "mt-1 block w-full", onChange: (e2) => setData("min_participants", parseInt(e2.target.value)) }),
                  /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.min_participants })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "max_participants", children: "Maks. Katılımcı" }),
                  /* @__PURE__ */ jsx(Input, { id: "max_participants", type: "number", name: "max_participants", value: data.max_participants, className: "mt-1 block w-full", onChange: (e2) => setData("max_participants", parseInt(e2.target.value)) }),
                  /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.max_participants })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "destinations", children: "Destinasyonlar" }),
                /* @__PURE__ */ jsx(MultiSelect, { options: destinationOptions, selectedValues: data.destinations, onSelect: handleDestinationSelect, placeholder: "Destinasyon Seç" }),
                /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.destinations })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 mt-4", children: [
                /* @__PURE__ */ jsx(Checkbox, { id: "is_popular", checked: data.is_popular, onCheckedChange: (checked) => setData("is_popular", checked) }),
                /* @__PURE__ */ jsx(Label, { htmlFor: "is_popular", children: "Popüler Tur" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 mt-4", children: [
                /* @__PURE__ */ jsx(Checkbox, { id: "is_published", checked: data.is_published, onCheckedChange: (checked) => setData("is_published", checked) }),
                /* @__PURE__ */ jsx(Label, { htmlFor: "is_published", children: "Yayınlandı" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(TabsContent, { value: "hotels", className: "space-y-6 pt-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Otel Bilgileri" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Her şehir ve kategori için otel listelerini yönetin." }),
              /* @__PURE__ */ jsx(Accordion, { type: "multiple", className: "w-full space-y-4", defaultValue: Object.keys(currentHotels), children: Object.keys(currentHotels).map((cityName) => /* @__PURE__ */ jsxs(AccordionItem, { value: cityName, className: "border rounded-lg px-4 pt-4", children: [
                /* @__PURE__ */ jsxs(AccordionTrigger, { className: "flex items-center justify-between font-bold text-base capitalize hover:no-underline p-0", children: [
                  /* @__PURE__ */ jsx(CardTitle, { className: "capitalize cursor-pointer text-lg font-semibold", children: cityName }),
                  /* @__PURE__ */ jsx("div", { className: "ml-auto p-2 rounded-full hover:bg-red-100 text-red-600 cursor-pointer", onClick: (e2) => {
                    e2.stopPropagation();
                    removeCityFromHotels(cityName);
                  }, children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
                ] }),
                /* @__PURE__ */ jsxs(AccordionContent, { className: "pt-3 pb-0", children: [
                  /* @__PURE__ */ jsx(Input, { type: "text", placeholder: "Yeni Kategori Ekle (Örn: Deluxe)", onKeyDown: (e2) => {
                    if (e2.key === "Enter") {
                      e2.preventDefault();
                      addCategoryToCity(cityName, e2.target.value);
                      e2.target.value = "";
                    }
                  }, className: "w-60 mb-3" }),
                  /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3", children: (currentHotels[cityName] && Object.keys(currentHotels[cityName]) || []).map((categoryName) => /* @__PURE__ */ jsxs("div", { className: "border rounded-md p-3", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                      /* @__PURE__ */ jsx("h4", { className: "font-semibold text-sm capitalize", children: categoryName }),
                      /* @__PURE__ */ jsx("div", { className: "p-1 rounded-full hover:bg-red-100 text-red-600 cursor-pointer", onClick: (e2) => {
                        e2.stopPropagation();
                        removeCategoryFromCity(cityName, categoryName);
                      }, children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "space-y-2 mb-3", children: (currentHotels[cityName][categoryName] || []).map((hotel, hotelIndex) => /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                      /* @__PURE__ */ jsx(Input, { type: "text", value: hotel.name, onChange: (e2) => {
                        const newHotels = { ...currentHotels };
                        newHotels[cityName][categoryName][hotelIndex].name = e2.target.value;
                        setCurrentHotels(newHotels);
                      }, placeholder: "Otel Adı", className: "flex-1" }),
                      /* @__PURE__ */ jsx(Button, { variant: "destructive", size: "icon", onClick: () => removeHotelFromCategory(cityName, categoryName, hotelIndex), children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
                    ] }, hotelIndex)) }),
                    /* @__PURE__ */ jsx(Input, { type: "text", placeholder: "Yeni Otel Adı Ekle", onKeyDown: (e2) => {
                      if (e2.key === "Enter") {
                        addHotelToCategory(cityName, categoryName, e2.target.value);
                        e2.target.value = "";
                      }
                    }, className: "w-full" })
                  ] }, `${cityName}-${categoryName}`)) })
                ] })
              ] }, cityName)) }),
              /* @__PURE__ */ jsx(Input, { type: "text", placeholder: "Yeni Şehir Ekle (Örn: istanbul)", onKeyDown: (e2) => {
                if (e2.key === "Enter") {
                  e2.preventDefault();
                  addCityToHotels(e2.target.value.toLowerCase());
                  e2.target.value = "";
                }
              }, className: "w-full" })
            ] }),
            /* @__PURE__ */ jsxs(TabsContent, { value: "media", className: "space-y-6 pt-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Tur Görsel Yönetimi" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Öne çıkan görseli ve galeri görsellerini buradan yönetin." }),
              /* @__PURE__ */ jsx(Separator, {}),
              /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
                /* @__PURE__ */ jsx(Label, { children: "Öne Çıkan Görsel" }),
                /* @__PURE__ */ jsxs("div", { className: "mt-2 border rounded-md p-4 flex flex-col items-center justify-center space-y-4", children: [
                  selectedFeaturedMedia ? /* @__PURE__ */ jsx("img", { src: selectedFeaturedMedia.original_url, alt: selectedFeaturedMedia.name || selectedFeaturedMedia.file_name, className: "max-w-full h-48 object-contain rounded-md" }) : /* @__PURE__ */ jsxs("div", { className: "text-gray-500 flex flex-col items-center", children: [
                    /* @__PURE__ */ jsx(ImageIcon, { className: "h-12 w-12 text-gray-400" }),
                    /* @__PURE__ */ jsx("span", { className: "mt-2", children: "Henüz bir görsel seçilmedi." })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                    /* @__PURE__ */ jsxs(Button, { type: "button", variant: "outline", onClick: () => setIsFeaturedModalOpen(true), children: [
                      /* @__PURE__ */ jsx(PlusCircle, { className: "mr-2 h-4 w-4" }),
                      selectedFeaturedMedia ? "Görseli Değiştir" : "Görsel Seç"
                    ] }),
                    selectedFeaturedMedia && /* @__PURE__ */ jsxs(Button, { type: "button", variant: "destructive", onClick: () => handleFeaturedMediaSelect(null), children: [
                      /* @__PURE__ */ jsx(Trash2, { className: "mr-2 h-4 w-4" }),
                      " Kaldır"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx(MediaManagerModal, { isOpen: isFeaturedModalOpen, onClose: () => setIsFeaturedModalOpen(false), onMediaSelect: (media) => {
                    handleFeaturedMediaSelect(media);
                    setIsFeaturedModalOpen(false);
                  }, initialSelectedMedia: selectedFeaturedMedia, isMultiSelect: false, media: media_files })
                ] }),
                /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.featured_media_id })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
                /* @__PURE__ */ jsx(Label, { children: "Galeri Görselleri" }),
                /* @__PURE__ */ jsx(DragDropContext, { onDragEnd: onGalleryDragEnd, children: /* @__PURE__ */ jsx(Droppable, { droppableId: "gallery-media", direction: "horizontal", children: (provided) => /* @__PURE__ */ jsxs("div", { ...provided.droppableProps, ref: provided.innerRef, className: "mt-2 border rounded-md p-4 flex flex-wrap gap-4 items-start", children: [
                  selectedGalleryMedia.length > 0 ? selectedGalleryMedia.map((media, index) => /* @__PURE__ */ jsx(Draggable, { draggableId: media.id.toString(), index, children: (provided2) => /* @__PURE__ */ jsxs("div", { ref: provided2.innerRef, ...provided2.draggableProps, ...provided2.dragHandleProps, className: "relative group w-32 h-32", children: [
                    /* @__PURE__ */ jsx("img", { src: media.thumbnail_url, alt: media.name || media.file_name, className: "w-full h-full object-cover rounded-md" }),
                    /* @__PURE__ */ jsx(Button, { variant: "destructive", size: "icon", className: "absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity", onClick: () => removeGalleryMedia(media.id), children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
                  ] }) }, media.id)) : /* @__PURE__ */ jsxs("div", { className: "text-gray-500 flex flex-col items-center w-full", children: [
                    /* @__PURE__ */ jsx(ImageIcon, { className: "h-12 w-12 text-gray-400" }),
                    /* @__PURE__ */ jsx("span", { className: "mt-2", children: "Henüz galeri görseli seçilmedi." })
                  ] }),
                  provided.placeholder
                ] }) }) }),
                /* @__PURE__ */ jsxs(Button, { type: "button", variant: "outline", onClick: () => setIsGalleryModalOpen(true), className: "mt-4", children: [
                  /* @__PURE__ */ jsx(PlusCircle, { className: "mr-2 h-4 w-4" }),
                  " Galeri Görseli Ekle"
                ] }),
                /* @__PURE__ */ jsx(MediaManagerModal, { isOpen: isGalleryModalOpen, onClose: () => setIsGalleryModalOpen(false), onMediaSelect: (items) => {
                  handleGalleryMediaSelect(items);
                  setIsGalleryModalOpen(false);
                }, initialSelectedMedia: selectedGalleryMedia, isMultiSelect: true, media: media_files })
              ] }),
              /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.gallery_media_ids })
            ] }),
            /* @__PURE__ */ jsxs(TabsContent, { value: "daily-program", className: "space-y-6 pt-4 daily-program-content", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Günlük Tur Programı" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Turunuzun gün gün detaylı programını buradan yönetin." }),
              /* @__PURE__ */ jsx(DragDropContext, { onDragEnd: onDayDragEnd, children: /* @__PURE__ */ jsx(Droppable, { droppableId: "days", children: (provided) => /* @__PURE__ */ jsx("div", { ...provided.droppableProps, ref: provided.innerRef, className: "space-y-4", children: /* @__PURE__ */ jsxs(Accordion, { type: "multiple", className: "w-full space-y-4", defaultValue: data.daily_program.map((day) => `day-${day.id}`), children: [
                data.daily_program.length > 0 ? data.daily_program.map((day, dayIndex) => /* @__PURE__ */ jsx(Draggable, { draggableId: String(day.id), index: dayIndex, children: (provided2) => /* @__PURE__ */ jsxs(AccordionItem, { value: `day-${day.id}`, ref: provided2.innerRef, ...provided2.draggableProps, className: "border rounded-lg px-4 pt-4 daily-program-day-item", children: [
                  /* @__PURE__ */ jsxs(AccordionTrigger, { className: "flex items-center justify-between font-bold text-base hover:no-underline p-0 capitalize", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-1", children: [
                      /* @__PURE__ */ jsx("span", { ...provided2.dragHandleProps, children: /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5 text-gray-400 cursor-grab" }) }),
                      /* @__PURE__ */ jsx(Input, { type: "text", value: day.title, onChange: (e2) => handleDayTitleChange(day.id, e2.target.value), className: "text-lg font-semibold flex-1 border-0 shadow-none focus:ring-0 p-0" })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "ml-auto p-2 rounded-full hover:bg-red-100 text-red-600 cursor-pointer", onClick: (e2) => {
                      e2.stopPropagation();
                      removeDay(day.id);
                    }, children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
                  ] }),
                  /* @__PURE__ */ jsxs(AccordionContent, { className: "pt-3 pb-0", children: [
                    /* @__PURE__ */ jsx(DragDropContext, { onDragEnd: (result) => onActivityDragEnd(result), children: /* @__PURE__ */ jsx(Droppable, { droppableId: `activities-${day.id}`, children: (providedActivities) => /* @__PURE__ */ jsxs("div", { ...providedActivities.droppableProps, ref: providedActivities.innerRef, className: "space-y-4", children: [
                      day.activities.length > 0 ? day.activities.map((activity, activityIndex) => /* @__PURE__ */ jsx(Draggable, { draggableId: String(activity.id), index: activityIndex, children: (providedActivity) => /* @__PURE__ */ jsxs("div", { ref: providedActivity.innerRef, ...providedActivity.draggableProps, className: "border rounded-md p-3 relative daily-program-activity-item", children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                          /* @__PURE__ */ jsx("span", { ...providedActivity.dragHandleProps, children: /* @__PURE__ */ jsx(Menu, { className: "h-4 w-4 text-gray-400 cursor-grab" }) }),
                          /* @__PURE__ */ jsxs(Label, { className: "flex items-center", children: [
                            /* @__PURE__ */ jsx(Checkbox, { checked: activity.is_highlight, onCheckedChange: (checked) => handleActivityChange(day.id, activity.id, "is_highlight", checked), className: "mr-2" }),
                            /* @__PURE__ */ jsx(Lightbulb, { className: "h-4 w-4 mr-1 text-yellow-500" }),
                            " Günün Etkinliği"
                          ] }),
                          /* @__PURE__ */ jsx("div", { className: "ml-auto p-1 rounded-full hover:bg-red-100 text-red-600 cursor-pointer", onClick: () => removeActivity(day.id, activity.id), children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                          /* @__PURE__ */ jsx(Label, { htmlFor: `activity-description-${day.id}-${activity.id}`, children: "Aktivite Açıklaması" }),
                          isBrowser && /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { children: "Yükleniyor..." }), children: /* @__PURE__ */ jsx(RichTextEditor, { value: activity.description || "", onChange: (value) => handleActivityChange(day.id, activity.id, "description", value), className: "mt-1 block w-full min-h-[100px]", showHtmlButton: false }) }),
                          /* @__PURE__ */ jsx(InputError, { message: errors[`daily_program.${dayIndex}.activities.${activityIndex}.description`], className: "mt-2" })
                        ] })
                      ] }) }, activity.id)) : /* @__PURE__ */ jsx("p", { className: "text-center text-gray-500", children: "Bu gün için henüz bir aktivite yok." }),
                      providedActivities.placeholder
                    ] }) }) }),
                    /* @__PURE__ */ jsxs(Button, { type: "button", onClick: () => addActivity(day.id), variant: "outline", className: "mt-4", children: [
                      /* @__PURE__ */ jsx(PlusCircle, { className: "mr-2 h-4 w-4" }),
                      " Aktivite Ekle"
                    ] })
                  ] })
                ] }, day.id) }, day.id)) : /* @__PURE__ */ jsx("p", { className: "text-center text-gray-500", children: "Henüz günlük program tanımlanmadı." }),
                provided.placeholder
              ] }) }) }) }),
              /* @__PURE__ */ jsxs(Button, { type: "button", onClick: addDay, className: "mt-4", children: [
                /* @__PURE__ */ jsx(PlusCircle, { className: "mr-2 h-4 w-4" }),
                " Yeni Gün Ekle"
              ] })
            ] }),
            /* @__PURE__ */ jsxs(TabsContent, { value: "pricing", className: "space-y-6 pt-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Tur Fiyatlandırması" }),
              /* @__PURE__ */ jsx("div", { className: "overflow-x-auto mt-4", children: /* @__PURE__ */ jsxs("table", { className: "w-full border-collapse", children: [
                /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b bg-muted/50", children: [
                  /* @__PURE__ */ jsx("th", { className: "px-3 py-2 text-start text-sm font-medium sticky left-0 bg-muted/50 z-10", children: "Sezon / Kategori" }),
                  config_categories.map((category) => /* @__PURE__ */ jsx("th", { className: "px-3 py-2 text-center text-sm font-medium border-l", children: category }, category))
                ] }) }),
                /* @__PURE__ */ jsx("tbody", { children: config_seasons.map((season) => /* @__PURE__ */ jsxs("tr", { className: "border-b last:border-b-0 hover:bg-muted/50", children: [
                  /* @__PURE__ */ jsx("td", { className: "px-3 py-2 text-sm font-medium sticky left-0 bg-background z-10 border-r", children: /* @__PURE__ */ jsx("span", { className: "font-semibold", children: season }) }),
                  config_categories.map((category) => {
                    const tier = data.pricing_tiers.find((t) => t.season_name === season && t.category_name === category) || {};
                    return /* @__PURE__ */ jsx("td", { className: "px-3 py-2 text-left text-sm border-l", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-1", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsx("label", { className: "text-xs w-12", children: "1 Kişi:" }),
                        /* @__PURE__ */ jsx(Input, { type: "number", step: "0.01", value: tier.price_per_person_1 || "", onChange: (e2) => handleMatrixPriceChange(season, category, "price_per_person_1", e2.target.value), className: "w-[80px]", placeholder: "-" })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsx("label", { className: "text-xs w-12", children: "2 Kişi:" }),
                        /* @__PURE__ */ jsx(Input, { type: "number", step: "0.01", value: tier.price_per_person_2 || "", onChange: (e2) => handleMatrixPriceChange(season, category, "price_per_person_2", e2.target.value), className: "w-[80px]", placeholder: "-" })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsx("label", { className: "text-xs w-12", children: "3 Kişi:" }),
                        /* @__PURE__ */ jsx(Input, { type: "number", step: "0.01", value: tier.price_per_person_3 || "", onChange: (e2) => handleMatrixPriceChange(season, category, "price_per_person_3", e2.target.value), className: "w-[80px]", placeholder: "-" })
                      ] })
                    ] }) }, `${season}-${category}`);
                  })
                ] }, season)) })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxs(TabsContent, { value: "optional-activities", className: "space-y-6 pt-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Opsiyonel Aktiviteler" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "optional_activities", children: "Aktiviteler" }),
                /* @__PURE__ */ jsx(MultiSelect, { options: optionalActivityOptions, selectedValues: data.optional_activity_ids, onSelect: handleOptionalActivitySelect, placeholder: "Aktivite Seç" }),
                /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.optional_activity_ids })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(TabsContent, { value: "seo", className: "space-y-6 pt-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "SEO Ayarları" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Bu tura özel SEO başlığı ve açıklaması girin. Boş bırakılırsa genel ayarlardaki şablonlar kullanılır." }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "meta_title", children: "Meta Başlık" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "meta_title",
                    type: "text",
                    value: data.meta_title || "",
                    onChange: (e2) => setData("meta_title", e2.target.value),
                    className: "mt-1 block w-full",
                    placeholder: "Genel şablon kullanılacak"
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.meta_title })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "meta_description", children: "Meta Açıklama" }),
                /* @__PURE__ */ jsx(
                  Textarea,
                  {
                    id: "meta_description",
                    value: data.meta_description || "",
                    onChange: (e2) => setData("meta_description", e2.target.value),
                    className: "mt-1 block w-full",
                    rows: 3,
                    placeholder: "Genel şablon kullanılacak"
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.meta_description })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex justify-start mt-6", children: /* @__PURE__ */ jsx(Button, { type: "submit", disabled: processing, children: "Değişiklikleri Kaydet" }) })
        ] }) }) }) })
      ]
    }
  );
}
const __vite_glob_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Edit$1
}, Symbol.toStringTag, { value: "Module" }));
function Index({ auth, tours }) {
  const handleDelete = (id) => {
    if (confirm("Bu turu silmek istediğinize emin misiniz?")) {
      router$1.delete(route("admin.tours.destroy", id));
    }
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      user: auth.user,
      header: "Turlar",
      actionButton: /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("admin.tours.create"), children: "Yeni Tur Ekle" }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Turlar" }),
        /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "p-4", children: [
          /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs(Table, { className: "min-w-full divide-y divide-gray-200", children: [
            /* @__PURE__ */ jsx(TableHeader, { className: "bg-gray-50", children: /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsx(TableHead, { children: "Görsel" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Başlık" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Yayınlandı" }),
              /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Aksiyonlar" })
            ] }) }),
            /* @__PURE__ */ jsx(TableBody, { children: tours.data.map((tour) => /* @__PURE__ */ jsxs(TableRow, { className: "group", children: [
              /* @__PURE__ */ jsx(TableCell, { children: tour.image ? /* @__PURE__ */ jsx("img", { src: tour.image.thumbnail_url, alt: tour.title, className: "w-16 h-16 object-cover rounded-md" }) : /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-muted flex items-center justify-center rounded-md text-muted-foreground text-xs text-center", children: "Görsel Yok" }) }),
              /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
                Link,
                {
                  href: route("admin.tours.edit", tour.id),
                  className: "text-black hover:underline",
                  children: tour.title
                }
              ) }),
              /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { variant: tour.is_published ? "default" : "destructive", children: tour.is_published ? "Evet" : "Hayır" }) }),
              /* @__PURE__ */ jsxs(TableCell, { className: "text-right flex items-center justify-end space-x-2", children: [
                /* @__PURE__ */ jsx(Link, { href: route("tour.show", tour.slug), target: "_blank", className: "text-muted-foreground hover:text-blue-600", children: /* @__PURE__ */ jsx(ExternalLink, { className: "h-5 w-5" }) }),
                /* @__PURE__ */ jsx(Link, { href: route("admin.tours.edit", tour.id), className: "text-muted-foreground hover:text-green-600", children: /* @__PURE__ */ jsx(Edit$5, { className: "h-5 w-5" }) }),
                /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: () => handleDelete(tour.id), className: "text-muted-foreground hover:text-red-600", children: /* @__PURE__ */ jsx(Trash2, { className: "h-5 w-5" }) })
              ] })
            ] }, tour.id)) })
          ] }) }),
          /* @__PURE__ */ jsx(Pagination, { links: tours.links })
        ] }) })
      ]
    }
  );
}
const __vite_glob_0_14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index
}, Symbol.toStringTag, { value: "Module" }));
function ContactUs() {
  return /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx(Head, { title: "İletişim" }),
    /* @__PURE__ */ jsxs("section", { className: "relative h-[40vh] md:h-[50vh] bg-cover bg-center text-white flex items-center justify-center", style: { backgroundImage: `url('https://images.pexels.com/photos/1583339/pexels-photo-1583339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')` }, children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/50 contact-us-hero-overlay" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 text-center px-4", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-5xl md:text-6xl font-bold mb-4 font-playfair", children: "Maceraya Hazır mısınız?" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg md:text-xl max-w-2xl mx-auto", children: "Hayalinizdeki tatil bir mesaj uzağınızda. Bize ulaşın, yolculuğunuza başlayalım." })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-background text-foreground", children: /* @__PURE__ */ jsx("div", { className: "container max-w-7xl mx-auto px-4 md:px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-1 space-y-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold text-primary font-playfair mb-6", children: "İletişim Kanallarımız" }),
        /* @__PURE__ */ jsxs(Card, { className: "contact-info-card p-6 bg-card shadow-lg border-none flex items-start space-x-4 transform hover:-translate-y-2 transition-transform duration-300", children: [
          /* @__PURE__ */ jsx(Phone, { className: "h-10 w-10 text-primary mt-1" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold", children: "Telefon" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Hafta içi 09:00 - 18:00 arası bize ulaşabilirsiniz." }),
            /* @__PURE__ */ jsx("a", { href: "tel:+905551234567", className: "text-primary font-bold hover:underline", children: "+90 555 123 45 67" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "contact-info-card p-6 bg-card shadow-lg border-none flex items-start space-x-4 transform hover:-translate-y-2 transition-transform duration-300", children: [
          /* @__PURE__ */ jsx(Mail, { className: "h-10 w-10 text-primary mt-1" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold", children: "E-posta" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Tüm sorularınız için 24 saat içinde yanıt veriyoruz." }),
            /* @__PURE__ */ jsx("a", { href: "mailto:info@tur10.com", className: "text-primary font-bold hover:underline", children: "info@tur10.com" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "contact-info-card p-6 bg-card shadow-lg border-none flex items-start space-x-4 transform hover:-translate-y-2 transition-transform duration-300", children: [
          /* @__PURE__ */ jsx(MapPin, { className: "h-10 w-10 text-primary mt-1" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold", children: "Ofisimiz" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Bir kahve içmeye bekleriz!" }),
            /* @__PURE__ */ jsx("p", { className: "font-bold", children: "Kızılay, Ankara, Türkiye" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxs(Card, { className: "contact-form-card p-8 bg-card shadow-2xl border-none", children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-4xl font-bold text-primary mb-4 font-playfair", children: "Bize Mesaj Gönderin" }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "name", className: "block text-sm font-medium text-muted-foreground mb-2", children: "Adınız Soyadınız" }),
              /* @__PURE__ */ jsx(Input, { type: "text", id: "name", placeholder: "John Doe", className: "w-full bg-input" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "email", className: "block text-sm font-medium text-muted-foreground mb-2", children: "E-posta Adresiniz" }),
              /* @__PURE__ */ jsx(Input, { type: "email", id: "email", placeholder: "ornek@mail.com", className: "w-full bg-input" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "subject", className: "block text-sm font-medium text-muted-foreground mb-2", children: "Konu" }),
            /* @__PURE__ */ jsx(Input, { type: "text", id: "subject", placeholder: "Tur Bilgisi, Öneri, vb.", className: "w-full bg-input" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "message", className: "block text-sm font-medium text-muted-foreground mb-2", children: "Mesajınız" }),
            /* @__PURE__ */ jsx(Textarea, { id: "message", placeholder: "Hayalinizdeki tatili anlatın...", rows: "6", className: "w-full bg-input" })
          ] }),
          /* @__PURE__ */ jsx(Button, { type: "submit", size: "lg", className: "w-full py-3 text-lg contact-form-submit-button transform hover:scale-105 transition-transform duration-300", children: "Mesajı Gönder" })
        ] }) })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-secondary text-foreground", children: /* @__PURE__ */ jsxs("div", { className: "container max-w-4xl mx-auto px-4 md:px-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold text-center mb-12 text-primary font-playfair", children: "Sıkça Sorulan Sorular" }),
      /* @__PURE__ */ jsxs(Accordion, { type: "single", collapsible: true, className: "w-full", children: [
        /* @__PURE__ */ jsxs(AccordionItem, { value: "item-1", children: [
          /* @__PURE__ */ jsx(AccordionTrigger, { className: "text-xl font-semibold", children: "Rezervasyonu nasıl yapabilirim?" }),
          /* @__PURE__ */ jsx(AccordionContent, { className: "text-lg text-muted-foreground", children: 'Tur sayfalarımızdaki "Rezervasyon Yap" butonunu kullanarak veya doğrudan bizimle iletişime geçerek kolayca rezervasyon yapabilirsiniz.' })
        ] }),
        /* @__PURE__ */ jsxs(AccordionItem, { value: "item-2", children: [
          /* @__PURE__ */ jsx(AccordionTrigger, { className: "text-xl font-semibold", children: "Turlarınızda konaklama dahil mi?" }),
          /* @__PURE__ */ jsx(AccordionContent, { className: "text-lg text-muted-foreground", children: "Evet, tüm turlarımızda belirtilen otellerde konaklama ücrete dahildir. Tur detay sayfasından otel bilgilerini inceleyebilirsiniz." })
        ] }),
        /* @__PURE__ */ jsxs(AccordionItem, { value: "item-3", children: [
          /* @__PURE__ */ jsx(AccordionTrigger, { className: "text-xl font-semibold", children: "Ödeme seçenekleriniz nelerdir?" }),
          /* @__PURE__ */ jsx(AccordionContent, { className: "text-lg text-muted-foreground", children: "Kredi kartı, banka havalesi ve online ödeme sistemleri ile güvenli bir şekilde ödeme yapabilirsiniz." })
        ] }),
        /* @__PURE__ */ jsxs(AccordionItem, { value: "item-4", children: [
          /* @__PURE__ */ jsx(AccordionTrigger, { className: "text-xl font-semibold", children: "Tur iptal politikası nedir?" }),
          /* @__PURE__ */ jsx(AccordionContent, { className: "text-lg text-muted-foreground", children: "Tur başlangıcından 15 gün öncesine kadar yapılan iptallerde tam para iadesi yapılmaktadır. Detaylı bilgi için sözleşmemizi inceleyebilirsiniz." })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container max-w-7xl mx-auto px-4 md:px-8 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold text-center mb-12 text-primary font-playfair", children: "Ofisimiz Nerede?" }),
      /* @__PURE__ */ jsx("div", { className: "rounded-lg overflow-hidden shadow-2xl contact-map-container", children: /* @__PURE__ */ jsx(
        "iframe",
        {
          src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.0000000000005!2d32.859740000000005!3d39.93336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34f0c4a4f0001%3A0x7d6c6e7e4a4f0001!2sKızılay%20Meydan%C4%B1!5e0!3m2!1str!2str!4v1678912345678!5m2!1str!2str",
          width: "100%",
          height: "450",
          style: { border: 0 },
          allowFullScreen: "",
          loading: "lazy",
          referrerPolicy: "no-referrer-when-downgrade",
          className: "contact-map-iframe"
        }
      ) })
    ] }) })
  ] });
}
const __vite_glob_0_15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ContactUs
}, Symbol.toStringTag, { value: "Module" }));
const Sidebar = ({ relatedPosts, allCategories, allDestinations, relatedTours, recentContents }) => /* @__PURE__ */ jsxs("aside", { className: "sidebar w-full lg:w-1/3 lg:pl-8", children: [
  relatedPosts && relatedPosts.length > 0 && /* @__PURE__ */ jsxs("div", { className: "sidebar-widget mb-8 bg-card p-4 rounded-lg border border-border shadow-sm", children: [
    /* @__PURE__ */ jsx("h3", { className: "sidebar-widget-title text-xl font-bold mb-4 text-foreground", children: "İlgili Yazılar" }),
    /* @__PURE__ */ jsx("ul", { className: "sidebar-post-list space-y-4", children: relatedPosts.map((post) => /* @__PURE__ */ jsx("li", { className: "sidebar-post-item flex items-center", children: /* @__PURE__ */ jsxs(Link, { href: route("contents.show", post.slug), className: "flex items-center group", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: post.image_thumbnail_url || "https://via.placeholder.com/80",
          alt: post.title,
          className: "w-16 h-16 object-cover rounded-md mr-4 group-hover:opacity-80 transition-opacity"
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "font-semibold text-muted-foreground group-hover:text-primary transition-colors", children: post.title })
    ] }) }, post.id)) })
  ] }),
  relatedTours && relatedTours.length > 0 && /* @__PURE__ */ jsxs("div", { className: "sidebar-widget mb-8 bg-card p-4 rounded-lg border border-border shadow-sm", children: [
    /* @__PURE__ */ jsx("h3", { className: "sidebar-widget-title text-xl font-bold mb-4 text-foreground", children: "İlgili Turlar" }),
    /* @__PURE__ */ jsx("ul", { className: "sidebar-post-list space-y-4", children: relatedTours.map((tour) => /* @__PURE__ */ jsx("li", { className: "sidebar-post-item flex items-center", children: /* @__PURE__ */ jsxs(Link, { href: route("tour.show", tour.slug), className: "flex items-center group", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: tour.image_thumbnail || "https://via.placeholder.com/80",
          alt: tour.title,
          className: "w-16 h-16 object-cover rounded-md mr-4 group-hover:opacity-80 transition-opacity"
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "font-semibold text-muted-foreground group-hover:text-primary transition-colors", children: tour.title })
    ] }) }, tour.id)) })
  ] }),
  recentContents && recentContents.length > 0 && /* @__PURE__ */ jsxs("div", { className: "sidebar-widget mb-8 bg-card p-4 rounded-lg border border-border shadow-sm", children: [
    /* @__PURE__ */ jsx("h3", { className: "sidebar-widget-title text-xl font-bold mb-4 text-foreground", children: "Son İçerikler" }),
    /* @__PURE__ */ jsx("ul", { className: "sidebar-post-list space-y-4", children: recentContents.map((content) => /* @__PURE__ */ jsx("li", { className: "sidebar-post-item flex items-center", children: /* @__PURE__ */ jsxs(Link, { href: route("contents.show", content.slug), className: "flex items-center group", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: content.image_thumbnail || "https://via.placeholder.com/80",
          alt: content.title,
          className: "w-16 h-16 object-cover rounded-md mr-4 group-hover:opacity-80 transition-opacity"
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "font-semibold text-muted-foreground group-hover:text-primary transition-colors", children: content.title })
    ] }) }, content.id)) })
  ] }),
  allCategories && allCategories.length > 0 && /* @__PURE__ */ jsxs("div", { className: "sidebar-widget mb-8 bg-card p-4 rounded-lg border border-border shadow-sm", children: [
    /* @__PURE__ */ jsx("h3", { className: "sidebar-widget-title text-xl font-bold mb-4 text-foreground", children: "Kategoriler" }),
    /* @__PURE__ */ jsx("ul", { className: "sidebar-category-list space-y-2", children: allCategories.map((category) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
      Link,
      {
        href: route("contents.index", { category: category.slug }),
        className: "sidebar-category-link text-muted-foreground hover:text-primary transition-colors flex justify-between items-center",
        children: [
          category.name,
          /* @__PURE__ */ jsx("i", { className: "fas fa-chevron-right text-xs" })
        ]
      }
    ) }, category.id)) })
  ] }),
  allDestinations && allDestinations.length > 0 && /* @__PURE__ */ jsxs("div", { className: "sidebar-widget bg-card p-4 rounded-lg border border-border shadow-sm", children: [
    /* @__PURE__ */ jsx("h3", { className: "sidebar-widget-title text-xl font-bold mb-4 text-foreground", children: "Destinasyonlar" }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: allDestinations.map((destination) => /* @__PURE__ */ jsx(
      Link,
      {
        href: route("destinations.show", destination.slug),
        className: "sidebar-destination-tag bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground px-3 py-1 rounded-full text-sm transition-colors",
        children: destination.name
      },
      destination.id
    )) })
  ] })
] });
function ContentDetail({ seo }) {
  var _a;
  const { post, relatedPosts, allCategories, allDestinations, relatedTours, recentContents } = usePage().props;
  const { fonts, currentFont } = useTheme();
  if (!post) {
    return /* @__PURE__ */ jsx(Guest, { children: /* @__PURE__ */ jsx("div", { className: `bg-background text-foreground min-h-screen ${fonts[currentFont].class} flex items-center justify-center`, children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-4", children: "İçerik Bulunamadı" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Aradığınız içerik mevcut değil veya silinmiş olabilir." }),
      /* @__PURE__ */ jsx(Link, { href: route("home"), className: "mt-6 inline-block bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/80 transition-colors", children: "Ana Sayfaya Dön" })
    ] }) }) });
  }
  return /* @__PURE__ */ jsx(Guest, { seo, children: /* @__PURE__ */ jsxs("div", { className: `content-detail-page bg-background text-foreground ${fonts[currentFont].class}`, children: [
    /* @__PURE__ */ jsxs(
      "section",
      {
        className: "content-hero-section relative bg-cover bg-center h-[50vh] flex items-end p-8 text-white",
        style: { backgroundImage: `url(${post.image_original_url || "https://via.placeholder.com/1200x600"})` },
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-6xl mx-auto w-full", children: [
            /* @__PURE__ */ jsx("h1", { className: "content-title text-4xl md:text-6xl font-extrabold leading-tight mb-2 font-playfair", children: post.title }),
            /* @__PURE__ */ jsxs("div", { className: "content-meta flex flex-wrap gap-x-4 gap-y-2 items-center text-sm text-gray-300", children: [
              /* @__PURE__ */ jsxs("span", { className: "meta-date", children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-calendar-alt mr-2" }),
                moment(post.published_at).locale("tr").format("DD MMMM YYYY")
              ] }),
              (_a = post.content_categories) == null ? void 0 : _a.map((cat) => /* @__PURE__ */ jsxs(Link, { href: route("contents.index", { category: cat.slug }), className: "meta-category-tag hover:text-primary transition-colors", children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-tag mr-1" }),
                cat.name
              ] }, cat.id))
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "main-content-area max-w-6xl mx-auto px-4 py-12", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-8", children: [
      /* @__PURE__ */ jsx("main", { className: "content-body w-full lg:w-3/4", children: /* @__PURE__ */ jsxs("article", { className: "bg-card rounded-lg border border-border p-6 md:p-8 shadow-sm", children: [
        post.summary && /* @__PURE__ */ jsx("p", { className: "summary-text text-lg italic text-muted-foreground border-l-4 border-primary pl-4 mb-8", children: post.summary }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "prose prose-lg dark:prose-invert max-w-none text-foreground/90",
            dangerouslySetInnerHTML: { __html: post.content }
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx(
        Sidebar,
        {
          relatedPosts,
          allCategories,
          allDestinations,
          relatedTours,
          recentContents
        }
      )
    ] }) })
  ] }) });
}
const __vite_glob_0_16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ContentDetail
}, Symbol.toStringTag, { value: "Module" }));
function Contents({ seo }) {
  var _a, _b;
  const { posts: backendPosts, categories: backendCategories, destinations: backendDestinations, filters } = usePage().props;
  const { darkMode, toggleDarkMode, currentFont, changeFont, fonts } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState(filters.category || "all");
  const [selectedDestination, setSelectedDestination] = useState(filters.destination || "all");
  const [searchQuery, setSearchQuery] = useState(filters.search || "");
  const posts = backendPosts.data;
  const paginationLinks = backendPosts.links;
  const categories = [{ name: "Tümü", slug: "all" }, ...backendCategories];
  const destinations = [{ name: "Tümü", slug: "all" }, ...backendDestinations];
  const applyFilters = () => {
    const queryParams = {};
    if (selectedCategory !== "all") {
      queryParams.category = selectedCategory;
    }
    if (selectedDestination !== "all") {
      queryParams.destination = selectedDestination;
    }
    if (searchQuery) {
      queryParams.search = searchQuery;
    }
    router$1.get(route("contents.index"), queryParams, { preserveState: true, replace: true });
  };
  const handleSearchChange = (e2) => {
    setSearchQuery(e2.target.value);
  };
  const handleSearchSubmit = (e2) => {
    if (e2.key === "Enter" || e2.type === "click") {
      applyFilters();
    }
  };
  return /* @__PURE__ */ jsx(Guest, { seo, children: /* @__PURE__ */ jsxs("div", { className: `blog-page bg-background text-foreground min-h-screen ${fonts[currentFont].class}`, children: [
    /* @__PURE__ */ jsxs("section", { className: "blog-hero-section relative h-[40vh] md:h-[50vh] flex items-center justify-center text-center bg-cover bg-center", style: { backgroundImage: `url(${((_b = (_a = posts[0]) == null ? void 0 : _a.image) == null ? void 0 : _b.original_url) || "https://images.pexels.com/photos/3418464/pexels-photo-3418464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"})` }, children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/60 blog-hero-overlay" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 text-white p-4 max-w-4xl mx-auto blog-hero-content", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-6xl font-extrabold leading-tight mb-4 font-playfair", children: "Blog" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg md:text-xl mb-8 opacity-0 animate-fade-in-up animation-delay-300", children: "Seyahat dünyasından en güncel haberler, ipuçları ve ilham verici hikayeler." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8", children: [
      " ",
      /* @__PURE__ */ jsx("aside", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxs("section", { className: "blog-filters-section py-8 lg:py-0 border-b border-border lg:border-b-0 sticky top-24", children: [
        " ",
        /* @__PURE__ */ jsx("div", { className: "md:hidden", children: /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "w-full", children: /* @__PURE__ */ jsxs(AccordionItem, { value: "blog-filters", children: [
          /* @__PURE__ */ jsx(AccordionTrigger, { className: "blog-accordion-trigger px-4 py-3 bg-card text-foreground font-semibold rounded-t-lg border border-b-0 border-border", children: "Blog Filtreleri" }),
          /* @__PURE__ */ jsxs(AccordionContent, { className: "blog-accordion-content bg-card border border-border rounded-b-lg p-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "blog-search-input-wrapper space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "search-input", className: "block text-sm font-medium text-muted-foreground", children: "Arama" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "search-input",
                    type: "text",
                    placeholder: "Yazı başlığında ara...",
                    value: searchQuery,
                    onChange: handleSearchChange,
                    onKeyDown: handleSearchSubmit,
                    className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "blog-category-filter-wrapper space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "category-filter", className: "block text-sm font-medium text-muted-foreground", children: "Kategori" }),
                /* @__PURE__ */ jsxs(
                  Select,
                  {
                    value: selectedCategory,
                    onValueChange: (value) => {
                      setSelectedCategory(value);
                    },
                    children: [
                      /* @__PURE__ */ jsx(
                        SelectTrigger,
                        {
                          id: "category-filter",
                          className: "inline-flex items-center justify-between whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 px-3 py-2",
                          children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Kategori seçin", className: "text-muted-foreground" })
                        }
                      ),
                      /* @__PURE__ */ jsx(SelectContent, { children: categories.map((cat) => /* @__PURE__ */ jsx(SelectItem, { value: cat.slug, children: cat.name }, cat.slug)) })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "blog-destination-filter-wrapper space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "destination-filter", className: "block text-sm font-medium text-muted-foreground", children: "Destinasyon" }),
                /* @__PURE__ */ jsxs(
                  Select,
                  {
                    value: selectedDestination,
                    onValueChange: (value) => {
                      setSelectedDestination(value);
                    },
                    children: [
                      /* @__PURE__ */ jsx(
                        SelectTrigger,
                        {
                          id: "destination-filter",
                          className: "inline-flex items-center justify-between whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 px-3 py-2",
                          children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Destinasyon seçin", className: "text-muted-foreground" })
                        }
                      ),
                      /* @__PURE__ */ jsx(SelectContent, { children: destinations.map((dest) => /* @__PURE__ */ jsx(SelectItem, { value: dest.slug, children: dest.name }, dest.slug)) })
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleSearchSubmit,
                className: "blog-filter-button mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-md font-semibold transition-colors",
                children: "Filtrele"
              }
            )
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsxs(Card, { className: "blog-filter-card hidden md:block", children: [
          /* @__PURE__ */ jsx(CardHeader, { className: "blog-filter-header", children: /* @__PURE__ */ jsx(CardTitle, { className: "blog-filter-title text-2xl", children: "Filtrele ve Ara" }) }),
          /* @__PURE__ */ jsxs(CardContent, { className: "blog-filter-content", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "blog-search-input-wrapper space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "search-input", className: "block text-sm font-medium text-muted-foreground", children: "Arama" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "search-input",
                    type: "text",
                    placeholder: "Yazı başlığında ara...",
                    value: searchQuery,
                    onChange: handleSearchChange,
                    onKeyDown: handleSearchSubmit,
                    className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "blog-category-filter-wrapper space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "category-filter", className: "block text-sm font-medium text-muted-foreground", children: "Kategori" }),
                /* @__PURE__ */ jsxs(
                  Select,
                  {
                    value: selectedCategory,
                    onValueChange: (value) => {
                      setSelectedCategory(value);
                    },
                    children: [
                      /* @__PURE__ */ jsx(
                        SelectTrigger,
                        {
                          id: "category-filter",
                          className: "inline-flex items-center justify-between whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 px-3 py-2",
                          children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Kategori seçin", className: "text-muted-foreground" })
                        }
                      ),
                      /* @__PURE__ */ jsx(SelectContent, { children: categories.map((cat) => /* @__PURE__ */ jsx(SelectItem, { value: cat.slug, children: cat.name }, cat.slug)) })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "blog-destination-filter-wrapper space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "destination-filter", className: "block text-sm font-medium text-muted-foreground", children: "Destinasyon" }),
                /* @__PURE__ */ jsxs(
                  Select,
                  {
                    value: selectedDestination,
                    onValueChange: (value) => {
                      setSelectedDestination(value);
                    },
                    children: [
                      /* @__PURE__ */ jsx(
                        SelectTrigger,
                        {
                          id: "destination-filter",
                          className: "inline-flex items-center justify-between whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 px-3 py-2",
                          children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Destinasyon seçin", className: "text-muted-foreground" })
                        }
                      ),
                      /* @__PURE__ */ jsx(SelectContent, { children: destinations.map((dest) => /* @__PURE__ */ jsx(SelectItem, { value: dest.slug, children: dest.name }, dest.slug)) })
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleSearchSubmit,
                className: "blog-filter-button mt-4 w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-md font-semibold transition-colors",
                children: "Filtrele"
              }
            )
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("main", { className: "lg:col-span-3", children: [
        posts.length > 0 ? /* @__PURE__ */ jsx("div", { className: "blog-posts-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: posts.map((post) => {
          var _a2;
          return /* @__PURE__ */ jsxs("div", { className: "blog-post-card bg-card rounded-lg border border-border overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 group", children: [
            /* @__PURE__ */ jsx(Link, { href: route("contents.show", post.slug), className: "blog-post-image-link block relative w-full h-48 overflow-hidden", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: ((_a2 = post.image) == null ? void 0 : _a2.thumbnail_url) || "https://placehold.co/600x400?text=Görsel+Bulunamadı",
                alt: post.title,
                className: "blog-post-image w-full h-full object-cover group-hover:scale-110 transition-transform duration-300",
                loading: "lazy"
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "blog-post-content p-4", children: [
              /* @__PURE__ */ jsx(Link, { href: route("contents.show", post.slug), className: "blog-post-title-link block", children: /* @__PURE__ */ jsx("h2", { className: "blog-post-title text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300", children: post.title }) }),
              /* @__PURE__ */ jsx("p", { className: "blog-post-summary text-muted-foreground text-sm mb-3", children: post.summary && post.summary.length > 0 ? post.summary.substring(0, 150) + (post.summary.length > 150 ? "..." : "") : "Bu blog yazısı için özet bulunmamaktadır." }),
              /* @__PURE__ */ jsxs("div", { className: "blog-post-meta flex flex-wrap gap-2 items-center text-xs text-muted-foreground mt-4", children: [
                post.content_categories.map((cat) => /* @__PURE__ */ jsxs("span", { className: "blog-category-tag bg-muted rounded-full px-2 py-1 flex items-center", children: [
                  /* @__PURE__ */ jsx("i", { className: "fas fa-tag mr-1 text-primary" }),
                  cat.name
                ] }, cat.id)),
                post.destinations.map((dest) => /* @__PURE__ */ jsxs("span", { className: "blog-destination-tag bg-muted rounded-full px-2 py-1 flex items-center", children: [
                  /* @__PURE__ */ jsx("i", { className: "fas fa-map-marker-alt mr-1 text-secondary" }),
                  dest.name
                ] }, dest.id))
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "blog-post-date-readtime flex items-center justify-between text-xs text-muted-foreground mt-4 pt-4 border-t border-border", children: [
                /* @__PURE__ */ jsx("p", { children: moment(post.published_at).locale("tr").format("DD MMMM YYYY") }),
                post.content && /* @__PURE__ */ jsxs("p", { children: [
                  Math.ceil(post.content.split(" ").length / 200),
                  " dk okuma"
                ] })
              ] }),
              /* @__PURE__ */ jsxs(Link, { href: route("contents.show", post.slug), className: "blog-read-more-link inline-flex items-center mt-4 text-primary hover:underline text-sm font-medium transition-colors", children: [
                "Devamını Oku ",
                /* @__PURE__ */ jsx("span", { className: "ml-1", children: "→" })
              ] })
            ] })
          ] }, post.id);
        }) }) : /* @__PURE__ */ jsx("p", { className: "blog-no-posts-message text-center text-muted-foreground text-lg mt-8", children: "Hiç blog yazısı bulunamadı." }),
        paginationLinks && paginationLinks[0] && paginationLinks.length > 3 && /* @__PURE__ */ jsx("div", { className: "blog-pagination flex justify-center mt-8 space-x-2", children: paginationLinks.map((link, index) => /* @__PURE__ */ jsx(
          Link,
          {
            href: link.url || "#",
            className: `px-4 py-2 rounded-md text-sm font-medium ${link.active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"} ${!link.url ? "opacity-50 cursor-not-allowed" : ""}`,
            preserveScroll: true,
            dangerouslySetInnerHTML: { __html: link.label }
          },
          link.label || index
        )) })
      ] })
    ] })
  ] }) });
}
const __vite_glob_0_17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Contents
}, Symbol.toStringTag, { value: "Module" }));
function Dashboard() {
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800", children: "Dashboard" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Dashboard" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden bg-white shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsx("div", { className: "p-6 text-gray-900", children: "You're logged in!" }) }) }) })
      ]
    }
  );
}
const __vite_glob_0_18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dashboard
}, Symbol.toStringTag, { value: "Module" }));
const { LazyLoadImage: LazyLoadImage$3 } = LazyLoadImagePkg;
function DestinationDetail({ seo }) {
  var _a;
  const { destination } = usePage().props;
  const { fonts, currentFont, darkMode } = useTheme();
  const [activeSection, setActiveSection] = useState("about");
  const toursCarouselRef = useRef(null);
  const contentsCarouselRef = useRef(null);
  useEffect(() => {
    const autoScroll = (ref) => {
      if (ref.current) {
        if (ref.current.scrollLeft + ref.current.clientWidth >= ref.current.scrollWidth) {
          ref.current.scrollLeft = 0;
        } else {
          ref.current.scrollBy({ left: ref.current.clientWidth / 2, behavior: "smooth" });
        }
      }
    };
    const tourInterval = setInterval(() => autoScroll(toursCarouselRef), 5e3);
    const contentsInterval = setInterval(() => autoScroll(contentsCarouselRef), 5e3);
    return () => {
      clearInterval(tourInterval);
      clearInterval(contentsInterval);
    };
  }, [destination.tours, destination.contents]);
  if (!destination) {
    return /* @__PURE__ */ jsx(Guest, { children: /* @__PURE__ */ jsx("div", { className: `bg-background text-foreground min-h-screen ${fonts[currentFont].class}`, children: /* @__PURE__ */ jsxs("main", { className: "max-w-6xl mx-auto px-4 py-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-6", children: "Destinasyon Bulunamadı" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Aradığınız destinasyon mevcut değil veya silinmiş olabilir." })
    ] }) }) });
  }
  useEffect(() => {
    const checkActiveSection = () => {
      const sections = ["tours", "about", "contents", "gallery"];
      const isMobile = window.innerWidth < 768;
      const offset = isMobile ? 180 : 200;
      const scrollPosition = window.scrollY + offset;
      for (let i2 = sections.length - 1; i2 >= 0; i2--) {
        const section = document.getElementById(sections[i2]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i2]);
          break;
        }
      }
    };
    window.addEventListener("scroll", checkActiveSection);
    window.addEventListener("resize", checkActiveSection);
    checkActiveSection();
    return () => {
      window.removeEventListener("scroll", checkActiveSection);
      window.removeEventListener("resize", checkActiveSection);
    };
  }, []);
  return /* @__PURE__ */ jsx(Guest, { seo, children: /* @__PURE__ */ jsxs("div", { className: `destination-detail-page bg-background text-foreground min-h-screen ${fonts[currentFont].class}`, children: [
    /* @__PURE__ */ jsxs("section", { className: "hero-section relative h-[50vh] flex items-center justify-center text-center bg-cover bg-center", style: { backgroundImage: `url(${((_a = destination.image) == null ? void 0 : _a.original_url) || "https://images.pexels.com/photos/3418464/pexels-photo-3418464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"})` }, children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/60 hero-overlay" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 text-white p-4 max-w-4xl mx-auto hero-content", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-6xl font-extrabold leading-tight mb-4 font-playfair animate-fade-in-up", children: destination.name }),
        destination.summary && /* @__PURE__ */ jsx("p", { className: "text-lg md:text-xl mb-4 opacity-0 animate-fade-in-up animation-delay-300", children: destination.summary })
      ] })
    ] }),
    /* @__PURE__ */ jsx("nav", { className: `sticky top-16 z-40 w-full border-b border-border ${darkMode ? "bg-black/60" : "bg-white/60"} backdrop-blur supports-[backdrop-filter]:`, children: /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 py-2", children: [
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: "#tours",
          className: `px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeSection === "tours" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`,
          children: [
            "Turlar (",
            destination.tours.length,
            ")"
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "#about",
          className: `px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeSection === "about" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`,
          children: "Hakkında"
        }
      ),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: "#contents",
          className: `px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeSection === "contents" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`,
          children: [
            "İçerikler (",
            destination.contents.length,
            ")"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: "#gallery",
          className: `px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeSection === "gallery" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`,
          children: [
            "Galeri (",
            destination.gallery_images.length,
            ")"
          ]
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto px-4 py-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-8", children: [
      " ",
      /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
        " ",
        /* @__PURE__ */ jsx("section", { id: "tours", className: "space-y-6", children: /* @__PURE__ */ jsxs(Card, { className: "bg-card rounded-lg border border-border p-6 shadow-sm", children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold leading-none tracking-tight", children: [
            destination.name,
            " Turlar"
          ] }) }),
          " ",
          /* @__PURE__ */ jsx(CardContent, { children: destination.tours.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: destination.tours.slice(0, 3).map((tour) => {
            var _a2;
            return /* @__PURE__ */ jsxs(Card, { className: "overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group tours-card flex flex-col", children: [
              /* @__PURE__ */ jsx(Link, { href: route("tour.show", tour.slug), className: "block", children: /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden tours-card-image-wrapper h-48", children: [
                /* @__PURE__ */ jsx(
                  LazyLoadImage$3,
                  {
                    src: ((_a2 = tour.image) == null ? void 0 : _a2.thumbnail_url) || "https://via.placeholder.com/400x200?text=Görsel+Bulunamadı",
                    alt: tour.title,
                    className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 tours-card-image",
                    effect: "blur",
                    wrapperClassName: "w-full h-full"
                  }
                ),
                tour.is_popular && /* @__PURE__ */ jsx("div", { className: "absolute top-4 left-4 tours-popular-tag-wrapper", children: /* @__PURE__ */ jsx("span", { className: "bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium tours-popular-tag", children: "En Popüler" }) }),
                /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4 tours-duration-tag-wrapper", children: /* @__PURE__ */ jsxs("span", { className: "bg-background/90 text-foreground px-3 py-1 rounded-full text-sm font-medium tours-duration-tag", children: [
                  tour.duration_days,
                  " Gün"
                ] }) })
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "p-6 flex flex-col justify-between flex-grow tours-card-content", children: [
                /* @__PURE__ */ jsx(Link, { href: route("tour.show", tour.slug), children: /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-2 tours-card-title hover:text-primary transition-colors", children: tour.title }) }),
                /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm mb-4 tours-card-summary", children: tour.summary ? tour.summary.substring(0, 100) + "..." : "" }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4 tours-card-meta", children: [
                  " ",
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 text-sm text-muted-foreground tours-card-details", children: [
                    /* @__PURE__ */ jsxs("span", { className: "flex items-center tours-card-participants", children: [
                      /* @__PURE__ */ jsx("i", { className: "fas fa-users mr-1" }),
                      tour.min_participants ?? "N/A",
                      "-",
                      tour.max_participants ?? "N/A",
                      " Kişi"
                    ] }),
                    /* @__PURE__ */ jsxs("span", { className: "flex items-center tours-card-rating", children: [
                      /* @__PURE__ */ jsx("i", { className: "fas fa-star mr-1 text-yellow-500" }),
                      typeof tour.rating === "number" ? tour.rating.toFixed(1) : "N/A"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between tours-card-footer", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsxs("span", { className: "text-2xl font-bold text-primary tours-card-price", children: [
                      "€",
                      tour.price_from || "N/A"
                    ] }),
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground block tours-card-price-label", children: "kişi başına" })
                  ] }),
                  /* @__PURE__ */ jsx(Button, { asChild: true, className: "tours-card-detail-button", children: /* @__PURE__ */ jsx(Link, { href: route("tour.show", tour.slug), children: "Detayları Gör" }) })
                ] })
              ] })
            ] }, tour.id);
          }) }) : /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Bu destinasyon için henüz tur bulunmamaktadır." }) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { id: "about", className: "space-y-6", children: /* @__PURE__ */ jsxs(Card, { className: "bg-card rounded-lg border border-border p-6 shadow-sm", children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Destinasyon Hakkında" }) }),
          /* @__PURE__ */ jsx(CardContent, { children: destination.description ? /* @__PURE__ */ jsx("div", { className: "prose prose-slate dark:prose-invert max-w-none text-foreground", dangerouslySetInnerHTML: { __html: destination.description } }) : /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Bu destinasyon için detaylı bir açıklama bulunmamaktadır." }) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { id: "contents", className: "space-y-6", children: /* @__PURE__ */ jsxs(Card, { className: "bg-card rounded-lg border border-border p-6 shadow-sm", children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold leading-none tracking-tight", children: [
            destination.name,
            " İçerikleri"
          ] }) }),
          " ",
          /* @__PURE__ */ jsx(CardContent, { children: destination.contents.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 overflow-x-auto hide-scrollbar", children: destination.contents.slice(0, 4).map((content) => {
            var _a2;
            return /* @__PURE__ */ jsxs(Card, { className: "blog-post-card bg-card rounded-lg border border-border overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 group h-full flex flex-col", children: [
              /* @__PURE__ */ jsx(Link, { href: route("contents.show", content.slug), className: "block", children: /* @__PURE__ */ jsx("div", { className: "relative w-full h-48 overflow-hidden", children: /* @__PURE__ */ jsx(
                LazyLoadImage$3,
                {
                  src: ((_a2 = content.image) == null ? void 0 : _a2.thumbnail_url) || "https://placehold.co/600x400?text=Görsel+Bulunamadı",
                  alt: content.title,
                  className: "blog-post-image w-full h-full object-cover group-hover:scale-110 transition-transform duration-300",
                  effect: "blur",
                  wrapperClassName: "w-full h-full"
                }
              ) }) }),
              /* @__PURE__ */ jsxs(CardContent, { className: "blog-post-content p-4 flex flex-col flex-grow", children: [
                /* @__PURE__ */ jsx(Link, { href: route("contents.show", content.slug), className: "blog-post-title-link block", children: /* @__PURE__ */ jsx("h3", { className: "blog-post-title text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300", children: content.title }) }),
                content.summary && /* @__PURE__ */ jsxs("p", { className: "blog-post-summary text-muted-foreground text-sm line-clamp-3 mb-auto", children: [
                  " ",
                  content.summary ? content.summary.substring(0, 150) + (content.summary.length > 150 ? "..." : "") : "Bu blog yazısı için özet bulunmamaktadır.",
                  " "
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "blog-post-meta flex flex-wrap gap-2 items-center text-xs text-muted-foreground mt-4", children: [
                  " ",
                  (content.content_categories || []).map((cat) => (
                    // Undefined kontrolü eklendi
                    /* @__PURE__ */ jsxs("span", { className: "blog-category-tag bg-muted rounded-full px-2 py-1 flex items-center", children: [
                      " ",
                      /* @__PURE__ */ jsx("i", { className: "fas fa-tag mr-1 text-primary" }),
                      cat.name
                    ] }, cat.id)
                  )),
                  (content.destinations || []).map((dest) => (
                    // Undefined kontrolü eklendi
                    /* @__PURE__ */ jsxs("span", { className: "blog-destination-tag bg-muted rounded-full px-2 py-1 flex items-center", children: [
                      " ",
                      /* @__PURE__ */ jsx("i", { className: "fas fa-map-marker-alt mr-1 text-secondary" }),
                      dest.name
                    ] }, dest.id)
                  ))
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "blog-post-date-readtime flex items-center justify-between text-xs text-muted-foreground mt-4 pt-4 border-t border-border", children: [
                  " ",
                  /* @__PURE__ */ jsx("p", { children: content.published_at ? format(new Date(content.published_at), "dd.MM.yyyy") : "-" }),
                  " ",
                  content.content && /* @__PURE__ */ jsxs("p", { children: [
                    Math.ceil(content.content.split(" ").length / 200),
                    " dk okuma"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs(Link, { href: route("contents.show", content.slug), className: "blog-read-more-link inline-flex items-center mt-4 text-primary hover:underline text-sm font-medium transition-colors", children: [
                  "Devamını Oku ",
                  /* @__PURE__ */ jsx("span", { className: "ml-1", children: "→" })
                ] })
              ] })
            ] }, content.id);
          }) }) : /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Bu destinasyon için henüz içerik bulunmamaktadır." }) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { id: "gallery", className: "space-y-6", children: /* @__PURE__ */ jsxs(Card, { className: "bg-card rounded-lg border border-border p-6 shadow-sm", children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold leading-none tracking-tight", children: [
            destination.name,
            " Galerisi"
          ] }) }),
          " ",
          /* @__PURE__ */ jsx(CardContent, { children: destination.gallery_images.length > 0 ? /* @__PURE__ */ jsx("div", { className: "columns-2 md:columns-3 lg:columns-4 gap-4", children: destination.gallery_images.map((image) => /* @__PURE__ */ jsx("div", { className: "mb-4 break-inside-avoid relative group rounded-lg overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-200", children: /* @__PURE__ */ jsx(
            LazyLoadImage$3,
            {
              src: image.thumbnail_url || "/placeholder.svg",
              alt: image.file_name,
              className: "w-full h-auto object-cover rounded-md",
              effect: "blur"
            }
          ) }, image.id)) }) : /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Bu destinasyon için henüz galeri görseli bulunmamaktadır." }) })
        ] }) })
      ] })
    ] }) })
  ] }) });
}
const __vite_glob_0_19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DestinationDetail
}, Symbol.toStringTag, { value: "Module" }));
const { LazyLoadImage: LazyLoadImage$2 } = LazyLoadImagePkg;
function Destinations({ seo }) {
  var _a, _b;
  const { destinations } = usePage().props;
  const { fonts, currentFont } = useTheme();
  return /* @__PURE__ */ jsx(Guest, { seo, children: /* @__PURE__ */ jsxs("div", { className: `destinations-page bg-background text-foreground min-h-screen ${fonts[currentFont].class}`, children: [
    /* @__PURE__ */ jsxs("section", { className: "hero-section relative h-[40vh] md:h-[50vh] flex items-center justify-center text-center bg-cover bg-center", style: { backgroundImage: `url(${((_b = (_a = destinations[0]) == null ? void 0 : _a.image) == null ? void 0 : _b.original_url) || "/images/hero-destinations.jpg"})` }, children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/60 hero-overlay" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 text-white p-4 max-w-4xl mx-auto hero-content", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-6xl font-extrabold leading-tight mb-4 font-playfair animate-fade-in-up", children: "Keşfedilecek Destinasyonlar" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg md:text-xl mb-4 opacity-0 animate-fade-in-up animation-delay-300", children: "Türkiye'nin dört bir yanındaki eşsiz güzellikleri keşfedin." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("main", { className: "max-w-6xl mx-auto px-4 py-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-6", children: "Tüm Destinasyonlarımız" }),
      destinations.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: destinations.map((destination) => {
        var _a2;
        return /* @__PURE__ */ jsx(Link, { href: route("destinations.show", destination.slug), className: "block", children: /* @__PURE__ */ jsxs(Card, { className: "destination-card bg-card rounded-lg border border-border overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 group", children: [
          /* @__PURE__ */ jsx("div", { className: "relative w-full h-48 overflow-hidden", children: /* @__PURE__ */ jsx(
            LazyLoadImage$2,
            {
              src: ((_a2 = destination.image) == null ? void 0 : _a2.thumbnail_url) || "/placeholder.svg",
              alt: destination.name,
              className: "destination-image w-full h-full object-cover group-hover:scale-110 transition-transform duration-300",
              effect: "blur",
              wrapperClassName: "w-full h-full"
            }
          ) }),
          /* @__PURE__ */ jsxs(CardContent, { className: "p-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-200", children: destination.name }),
            destination.summary && /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm line-clamp-3 mb-2", children: destination.summary }),
            destination.lowest_tour_price !== null && /* @__PURE__ */ jsxs("p", { className: "text-sm text-primary font-bold mt-2", children: [
              "starts from €",
              destination.lowest_tour_price
            ] })
          ] })
        ] }) }, destination.id);
      }) }) : /* @__PURE__ */ jsx("p", { className: "text-center text-muted-foreground", children: "Henüz keşfedilecek destinasyon bulunamadı." })
    ] })
  ] }) });
}
const __vite_glob_0_20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Destinations
}, Symbol.toStringTag, { value: "Module" }));
const { LazyLoadImage: LazyLoadImage$1 } = LazyLoadImagePkg;
function TourCard({ tour, featuredBadge: FeaturedBadge }) {
  var _a;
  return /* @__PURE__ */ jsxs(Card, { className: "w-full h-full flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group relative", children: [
    tour.is_featured && FeaturedBadge && /* @__PURE__ */ jsx(FeaturedBadge, {}),
    /* @__PURE__ */ jsx(Link, { href: route("tour.show", tour.slug), className: "block", children: /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden h-48", children: [
      /* @__PURE__ */ jsx(
        LazyLoadImage$1,
        {
          src: ((_a = tour.image) == null ? void 0 : _a.thumbnail_url) || "https://via.placeholder.com/400x200?text=Görsel+Bulunamadı",
          alt: tour.title,
          className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300",
          effect: "blur",
          wrapperClassName: "w-full h-full"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4", children: /* @__PURE__ */ jsx("div", { className: "inline-flex items-center rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm", children: /* @__PURE__ */ jsxs("span", { children: [
        tour.duration_days,
        " Gün"
      ] }) }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "p-6 flex flex-col justify-between flex-grow", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Link, { href: route("tour.show", tour.slug), children: /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-2 hover:text-primary transition-colors", children: tour.title }) }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm mb-4", children: tour.summary ? tour.summary.substring(0, 100) + "..." : "" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxs("span", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(Users, { size: 14, className: "mr-1.5" }),
            tour.min_participants ?? "N/A",
            "-",
            tour.max_participants ?? "N/A",
            " Kişi"
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(Star, { size: 14, className: "mr-1.5 text-yellow-500" }),
            typeof tour.rating === "number" ? tour.rating.toFixed(1) : "N/A"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("span", { className: "text-2xl font-bold text-primary", children: [
              "€",
              tour.price_from || "N/A"
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground block -mt-1", children: "kişi başına" })
          ] }),
          /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("tour.show", tour.slug), children: "Detayları Gör" }) })
        ] })
      ] })
    ] })
  ] });
}
function FeaturedBadgeCorner() {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "absolute top-0 left-0 w-28 h-28 overflow-hidden",
      style: { clipPath: "polygon(0 0, 100% 0, 0 100%)" },
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute top-[18px] left-[-30px] w-[150px] transform -rotate-45 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider text-center py-1 shadow-md",
          children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center", children: [
            /* @__PURE__ */ jsx(Star, { size: 12, className: "mr-1.5" }),
            /* @__PURE__ */ jsx("span", { children: "Öne Çıkan" })
          ] })
        }
      )
    }
  );
}
function Home({ tours, popularDestinations, seo }) {
  const { darkMode, toggleDarkMode, currentFont, changeFont, fonts } = useTheme();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [iframeTop, setIframeTop] = useState("-20%");
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIframeTop("-50%");
      } else {
        setIframeTop("-20%");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    const timer = setTimeout(() => {
      setVideoLoaded(true);
    }, 500);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return /* @__PURE__ */ jsxs(Guest, { seo, children: [
    /* @__PURE__ */ jsxs("section", { className: "relative h-[calc(100vh-64px)] flex items-center justify-center text-center overflow-hidden", children: [
      videoLoaded && /* @__PURE__ */ jsx(
        "iframe",
        {
          className: "absolute",
          style: {
            width: "355.55%",
            // 16:9 en boy oranını korurken konteyner genişliğine göre ayarlandı
            height: "200%",
            // Konteynerin iki katı yükseklik, %50 içerik görünürlüğünü sağlar
            left: "-127.77%",
            // Genişletilmiş iframe'i yatayda ortala
            top: iframeTop
            // Dikeyde %10 üstten kesme sağlamak için konumlandır
          },
          src: "https://www.youtube.com/embed/oe_kmwcO1ag?autoplay=1&mute=1&loop=1&playlist=oe_kmwcO1ag&controls=0&modestbranding=1&rel=0",
          frameBorder: "0",
          allow: "autoplay; encrypted-media",
          allowFullScreen: true
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/55" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 text-white p-4 max-w-6xl mx-auto", children: [
        " ",
        /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-6xl font-extrabold leading-tight mb-4 animate-fade-in-up font-playfair", children: "Türkiye'nin Keşfedilmeyi Bekleyen Cennetleri" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg md:text-xl mb-8 opacity-0 animate-fade-in-up animation-delay-300", children: "Unutulmaz turlar ve eşsiz deneyimlerle Türkiye'nin büyülü güzelliklerini keşfedin." }),
        /* @__PURE__ */ jsx(Button, { asChild: true, className: "bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 opacity-0 animate-fade-in-up animation-delay-600", children: /* @__PURE__ */ jsx(Link, { href: "/tours", children: "Tüm Turlarımızı Keşfedin" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "marketing-and-trust-section py-16 bg-muted/40", children: /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-12 items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-amber-600 mb-4 font-playfair", children: "Hayallerinizdeki Türkiye Turu, Profesyonel Dokunuşlarla Gerçeğe Dönüşüyor" }),
        /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground mb-6 text-lg", children: [
          "Büyüleyici İstanbul'dan masalsı Kapadokya'ya, antik Efes'ten bembeyaz Pamukkale'ye uzanan bu topraklarda, size özel olarak hazırladığımız, ",
          /* @__PURE__ */ jsx("span", { className: "font-semibold text-foreground", children: "sadece İspanyolca konuşan profesyonel rehberler" }),
          " eşliğinde unutulmaz anılar biriktirin."
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-amber-600 mb-4 font-playfair", children: "Her Şey Dahil, Stresten Uzak Bir Tatil Deneyimi" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-lg", children: "Uluslararası uçuşlarınız hariç tüm detayları biz düşünüyoruz. Size sadece Türkiye'nin tadını çıkarmak kalıyor. Konforlu konaklama, yerel lezzetler ve kusursuz bir seyahat planı ile yolculuğunuzun her anı keyif dolu geçecek." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center space-y-6", children: [
        /* @__PURE__ */ jsx("a", { href: "https://www.tripadvisor.es/Attraction_Review-g293974-d13153444-Reviews-Pride_Travel-Istanbul.html", target: "_blank", rel: "noopener noreferrer", className: "transition-transform hover:scale-110", children: /* @__PURE__ */ jsx("img", { src: "https://logodix.com/logo/464050.png", alt: "TripAdvisor", className: "h-48" }) }),
        /* @__PURE__ */ jsx("div", { className: "border p-4 rounded-lg text-center bg-card shadow-lg w-full", children: /* @__PURE__ */ jsxs("a", { href: "https://www.tursab.org.tr/tr/dd-acente-sorgulama", target: "_blank", rel: "noopener noreferrer", className: "group", children: [
          /* @__PURE__ */ jsx("p", { className: "font-extrabold text-xl text-red-600 group-hover:text-red-700 transition-colors", children: "TÜRSAB" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-muted-foreground", children: "Resmi Acente Doğrulama" }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs mt-2 text-muted-foreground group-hover:text-foreground transition-colors", children: [
            "Güvenliğiniz bizim için öncelik. ",
            /* @__PURE__ */ jsx("br", {}),
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-bold", children: "A-5240" }),
            " lisans numaramızla kaydımızı doğrulayın."
          ] })
        ] }) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-muted/40", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold text-center mb-12 font-playfair", children: "Öne Çıkan Turlarımız" }),
      tours.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: tours.map((tour) => /* @__PURE__ */ jsx(TourCard, { tour, featuredBadge: FeaturedBadgeCorner }, tour.id)) }) : /* @__PURE__ */ jsx("p", { className: "text-center text-muted-foreground", children: "Şu anda öne çıkan tur bulunmamaktadır." })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "py-16 bg-muted/40", children: [
      " ",
      /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-4", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold text-center mb-12 font-playfair", children: "Popüler Destinasyonlar" }),
        popularDestinations.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: [
          " ",
          popularDestinations.map((destination) => {
            var _a;
            return /* @__PURE__ */ jsx(Link, { href: route("destinations.show", destination.slug), className: "block", children: /* @__PURE__ */ jsx(Card, { className: "overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative group", children: /* @__PURE__ */ jsxs("div", { className: "relative w-full h-64", children: [
              " ",
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: ((_a = destination.image) == null ? void 0 : _a.thumbnail_url) || "https://via.placeholder.com/400x200?text=Görsel+Bulunamadı",
                  alt: destination.name,
                  className: "w-full h-full object-cover",
                  loading: "lazy"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4 transition-opacity duration-300 group-hover:from-black/50", children: [
                /* @__PURE__ */ jsxs("div", { className: "text-white", children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-1 destinasyon-baslik", children: destination.name }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm opacity-90 mb-2 destinasyon-aciklama", children: destination.summary })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "flex justify-end mt-4", children: /* @__PURE__ */ jsx(Button, { onClick: () => router$1.visit(route("destinations.show", destination.slug)), className: "bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 text-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 destinasyon-butonu", children: "Turları Gör" }) })
              ] })
            ] }) }) }, destination.id);
          })
        ] }) : /* @__PURE__ */ jsx("p", { className: "text-center text-muted-foreground", children: "Şu anda popüler destinasyon bulunmamaktadır." })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-4", children: [
      " ",
      /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold mb-8 font-playfair", children: "Neden Bizi Seçmelisiniz?" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground max-w-7xl mx-auto mb-12", children: "Yılların verdiği tecrübe ve müşteri memnuniyeti odaklı hizmet anlayışımızla, size en iyi seyahat deneyimini sunmak için buradayız." }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-6 bg-card rounded-lg shadow-md border border-border", children: [
          /* @__PURE__ */ jsx("i", { className: "fas fa-globe text-primary text-5xl mb-4" }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-2", children: "Geniş Destinasyon Seçenekleri" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: "Türkiye'nin her köşesinden eşsiz turlar." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 bg-card rounded-lg shadow-md border border-border", children: [
          /* @__PURE__ */ jsx("i", { className: "fas fa-star text-primary text-5xl mb-4" }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-2", children: "Müşteri Memnuniyeti" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: "Binlerce mutlu müşteri yorumu." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 bg-card rounded-lg shadow-md border border-border", children: [
          /* @__PURE__ */ jsx("i", { className: "fas fa-wallet text-primary text-5xl mb-4" }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-2", children: "Uygun Fiyatlar" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: "En uygun fiyat garantisi." })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-primary text-primary-foreground text-center", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-4", children: [
      " ",
      /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold mb-6 font-playfair", children: "Hayalinizdeki Turu Planlayın" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg mb-8 opacity-80", children: "Türkiye'nin büyüleyici manzaralarını keşfetmek için daha ne bekliyorsunuz? Hemen bize ulaşın!" }),
      /* @__PURE__ */ jsx(Button, { asChild: true, className: "bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-6 text-lg rounded-full shadow-lg transition-all duration-300 transform hover:scale-105", children: /* @__PURE__ */ jsx(Link, { href: "/contact", children: "Bize Ulaşın" }) })
    ] }) })
  ] });
}
const __vite_glob_0_21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Home
}, Symbol.toStringTag, { value: "Module" }));
const Tours$1 = () => {
  const { tours, filters, allDestinations } = usePage().props;
  useRef(null);
  const [selectedDestinations, setSelectedDestinations] = useState(filters.destinations || []);
  const [selectedDurations, setSelectedDurations] = useState(filters.duration_range || []);
  const [selectedPrices, setSelectedPrices] = useState(filters.price_range || []);
  const [sortBy, setSortBy] = useState(filters.sort_by || "latest");
  useEffect(() => {
  }, [selectedDestinations, selectedDurations, selectedPrices, sortBy]);
  return /* @__PURE__ */ jsx("div", {});
};
const __vite_glob_0_22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Tours$1
}, Symbol.toStringTag, { value: "Module" }));
function DangerButton({
  className = "",
  disabled,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      className: `inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-700 ${disabled && "opacity-25"} ` + className,
      disabled,
      children
    }
  );
}
function InputLabel({
  value,
  className = "",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "label",
    {
      ...props,
      className: `block text-sm font-medium text-gray-700 ` + className,
      children: value ? value : children
    }
  );
}
function Modal({
  children,
  show = false,
  maxWidth = "2xl",
  closeable = true,
  onClose = () => {
  }
}) {
  const close = () => {
    if (closeable) {
      onClose();
    }
  };
  const maxWidthClass = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    "2xl": "sm:max-w-2xl"
  }[maxWidth];
  return /* @__PURE__ */ jsx(Transition, { show, leave: "duration-200", children: /* @__PURE__ */ jsxs(
    Dialog$1,
    {
      as: "div",
      id: "modal",
      className: "fixed inset-0 z-50 flex transform items-center overflow-y-auto px-4 py-6 transition-all sm:px-0",
      onClose: close,
      children: [
        /* @__PURE__ */ jsx(
          TransitionChild,
          {
            enter: "ease-out duration-300",
            enterFrom: "opacity-0",
            enterTo: "opacity-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gray-500/75" })
          }
        ),
        /* @__PURE__ */ jsx(
          TransitionChild,
          {
            enter: "ease-out duration-300",
            enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            enterTo: "opacity-100 translate-y-0 sm:scale-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
            leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            children: /* @__PURE__ */ jsx(
              DialogPanel,
              {
                className: `mb-6 transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:mx-auto sm:w-full ${maxWidthClass}`,
                children
              }
            )
          }
        )
      ]
    }
  ) });
}
function SecondaryButton({
  type = "button",
  className = "",
  disabled,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      type,
      className: `inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 ${disabled && "opacity-25"} ` + className,
      disabled,
      children
    }
  );
}
const TextInput = forwardRef(function TextInput2({ type = "text", className = "", isFocused = false, ...props }, ref) {
  const localRef = useRef(null);
  useImperativeHandle(ref, () => ({
    focus: () => {
      var _a;
      return (_a = localRef.current) == null ? void 0 : _a.focus();
    }
  }));
  useEffect(() => {
    var _a;
    if (isFocused) {
      (_a = localRef.current) == null ? void 0 : _a.focus();
    }
  }, [isFocused]);
  return /* @__PURE__ */ jsx(
    "input",
    {
      ...props,
      type,
      className: "rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 " + className,
      ref: localRef
    }
  );
});
function DeleteUserForm({ className = "" }) {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const passwordInput = useRef();
  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
    clearErrors
  } = useForm({
    password: ""
  });
  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);
  };
  const deleteUser = (e2) => {
    e2.preventDefault();
    destroy(route("profile.destroy"), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordInput.current.focus(),
      onFinish: () => reset()
    });
  };
  const closeModal = () => {
    setConfirmingUserDeletion(false);
    clearErrors();
    reset();
  };
  return /* @__PURE__ */ jsxs("section", { className: `space-y-6 ${className}`, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Delete Account" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain." })
    ] }),
    /* @__PURE__ */ jsx(DangerButton, { onClick: confirmUserDeletion, children: "Delete Account" }),
    /* @__PURE__ */ jsx(Modal, { show: confirmingUserDeletion, onClose: closeModal, children: /* @__PURE__ */ jsxs("form", { onSubmit: deleteUser, className: "p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Are you sure you want to delete your account?" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
        /* @__PURE__ */ jsx(
          InputLabel,
          {
            htmlFor: "password",
            value: "Password",
            className: "sr-only"
          }
        ),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            ref: passwordInput,
            value: data.password,
            onChange: (e2) => setData("password", e2.target.value),
            className: "mt-1 block w-3/4",
            isFocused: true,
            placeholder: "Password"
          }
        ),
        /* @__PURE__ */ jsx(
          InputError,
          {
            message: errors.password,
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 flex justify-end", children: [
        /* @__PURE__ */ jsx(SecondaryButton, { onClick: closeModal, children: "Cancel" }),
        /* @__PURE__ */ jsx(DangerButton, { className: "ms-3", disabled: processing, children: "Delete Account" })
      ] })
    ] }) })
  ] });
}
const __vite_glob_0_24 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DeleteUserForm
}, Symbol.toStringTag, { value: "Module" }));
function PrimaryButton({
  className = "",
  disabled,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      className: `inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 ${disabled && "opacity-25"} ` + className,
      disabled,
      children
    }
  );
}
function UpdatePasswordForm({ className = "" }) {
  const passwordInput = useRef();
  const currentPasswordInput = useRef();
  const {
    data,
    setData,
    errors,
    put,
    reset,
    processing,
    recentlySuccessful
  } = useForm({
    current_password: "",
    password: "",
    password_confirmation: ""
  });
  const updatePassword = (e2) => {
    e2.preventDefault();
    put(route("password.update"), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: (errors2) => {
        if (errors2.password) {
          reset("password", "password_confirmation");
          passwordInput.current.focus();
        }
        if (errors2.current_password) {
          reset("current_password");
          currentPasswordInput.current.focus();
        }
      }
    });
  };
  return /* @__PURE__ */ jsxs("section", { className, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Update Password" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Ensure your account is using a long, random password to stay secure." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: updatePassword, className: "mt-6 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          InputLabel,
          {
            htmlFor: "current_password",
            value: "Current Password"
          }
        ),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "current_password",
            ref: currentPasswordInput,
            value: data.current_password,
            onChange: (e2) => setData("current_password", e2.target.value),
            type: "password",
            className: "mt-1 block w-full",
            autoComplete: "current-password"
          }
        ),
        /* @__PURE__ */ jsx(
          InputError,
          {
            message: errors.current_password,
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "New Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            ref: passwordInput,
            value: data.password,
            onChange: (e2) => setData("password", e2.target.value),
            type: "password",
            className: "mt-1 block w-full",
            autoComplete: "new-password"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          InputLabel,
          {
            htmlFor: "password_confirmation",
            value: "Confirm Password"
          }
        ),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password_confirmation",
            value: data.password_confirmation,
            onChange: (e2) => setData("password_confirmation", e2.target.value),
            type: "password",
            className: "mt-1 block w-full",
            autoComplete: "new-password"
          }
        ),
        /* @__PURE__ */ jsx(
          InputError,
          {
            message: errors.password_confirmation,
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Save" }),
        /* @__PURE__ */ jsx(
          Transition,
          {
            show: recentlySuccessful,
            enter: "transition ease-in-out",
            enterFrom: "opacity-0",
            leave: "transition ease-in-out",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Saved." })
          }
        )
      ] })
    ] })
  ] });
}
const __vite_glob_0_25 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UpdatePasswordForm
}, Symbol.toStringTag, { value: "Module" }));
function UpdateProfileInformation({
  mustVerifyEmail,
  status,
  className = ""
}) {
  const user = usePage().props.auth.user;
  const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
    name: user.name,
    email: user.email
  });
  const submit = (e2) => {
    e2.preventDefault();
    patch(route("profile.update"));
  };
  return /* @__PURE__ */ jsxs("section", { className, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Profile Information" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Update your account's profile information and email address." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "mt-6 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Name" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "name",
            className: "mt-1 block w-full",
            value: data.name,
            onChange: (e2) => setData("name", e2.target.value),
            required: true,
            isFocused: true,
            autoComplete: "name"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.name })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "email",
            type: "email",
            className: "mt-1 block w-full",
            value: data.email,
            onChange: (e2) => setData("email", e2.target.value),
            required: true,
            autoComplete: "username"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.email })
      ] }),
      mustVerifyEmail && user.email_verified_at === null && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-gray-800", children: [
          "Your email address is unverified.",
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("verification.send"),
              method: "post",
              as: "button",
              className: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
              children: "Click here to re-send the verification email."
            }
          )
        ] }),
        status === "verification-link-sent" && /* @__PURE__ */ jsx("div", { className: "mt-2 text-sm font-medium text-green-600", children: "A new verification link has been sent to your email address." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Save" }),
        /* @__PURE__ */ jsx(
          Transition,
          {
            show: recentlySuccessful,
            enter: "transition ease-in-out",
            enterFrom: "opacity-0",
            leave: "transition ease-in-out",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Saved." })
          }
        )
      ] })
    ] })
  ] });
}
const __vite_glob_0_26 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UpdateProfileInformation
}, Symbol.toStringTag, { value: "Module" }));
function Edit({ mustVerifyEmail, status }) {
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800", children: "Profile" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Profile" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-white p-4 shadow sm:rounded-lg sm:p-8", children: /* @__PURE__ */ jsx(
            UpdateProfileInformation,
            {
              mustVerifyEmail,
              status,
              className: "max-w-xl"
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "bg-white p-4 shadow sm:rounded-lg sm:p-8", children: /* @__PURE__ */ jsx(UpdatePasswordForm, { className: "max-w-xl" }) }),
          /* @__PURE__ */ jsx("div", { className: "bg-white p-4 shadow sm:rounded-lg sm:p-8", children: /* @__PURE__ */ jsx(DeleteUserForm, { className: "max-w-xl" }) })
        ] }) })
      ]
    }
  );
}
const __vite_glob_0_23 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Edit
}, Symbol.toStringTag, { value: "Module" }));
const CarouselContext = React.createContext(null);
function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}
const Carousel = React.forwardRef(({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}, ref) => {
  const [carouselRef, api] = useEmblaCarousel({
    ...opts,
    axis: orientation === "horizontal" ? "x" : "y"
  }, plugins);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  const onSelect = React.useCallback((api2) => {
    if (!api2) {
      return;
    }
    setCanScrollPrev(api2.canScrollPrev());
    setCanScrollNext(api2.canScrollNext());
  }, []);
  const scrollPrev = React.useCallback(() => {
    api == null ? void 0 : api.scrollPrev();
  }, [api]);
  const scrollNext = React.useCallback(() => {
    api == null ? void 0 : api.scrollNext();
  }, [api]);
  const handleKeyDown = React.useCallback((event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollNext();
    }
  }, [scrollPrev, scrollNext]);
  React.useEffect(() => {
    if (!api || !setApi) {
      return;
    }
    setApi(api);
  }, [api, setApi]);
  React.useEffect(() => {
    if (!api) {
      return;
    }
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);
    return () => {
      api == null ? void 0 : api.off("select", onSelect);
    };
  }, [api, onSelect]);
  return /* @__PURE__ */ jsx(
    CarouselContext.Provider,
    {
      value: {
        carouselRef,
        api,
        opts,
        orientation: orientation || ((opts == null ? void 0 : opts.axis) === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext
      },
      children: /* @__PURE__ */ jsx(
        "div",
        {
          ref,
          onKeyDownCapture: handleKeyDown,
          className: cn("relative", className),
          role: "region",
          "aria-roledescription": "carousel",
          ...props,
          children
        }
      )
    }
  );
});
Carousel.displayName = "Carousel";
const CarouselContent = React.forwardRef(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();
  return /* @__PURE__ */ jsx("div", { ref: carouselRef, className: "overflow-hidden", children: /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn(
        "flex",
        orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
        className
      ),
      ...props
    }
  ) });
});
CarouselContent.displayName = "CarouselContent";
const CarouselItem = React.forwardRef(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      role: "group",
      "aria-roledescription": "slide",
      className: cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      ),
      ...props
    }
  );
});
CarouselItem.displayName = "CarouselItem";
const CarouselPrevious = React.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();
  return /* @__PURE__ */ jsxs(
    Button,
    {
      ref,
      variant,
      size,
      className: cn("absolute  h-8 w-8 rounded-full", orientation === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90", className),
      disabled: !canScrollPrev,
      onClick: scrollPrev,
      ...props,
      children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Previous slide" })
      ]
    }
  );
});
CarouselPrevious.displayName = "CarouselPrevious";
const CarouselNext = React.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();
  return /* @__PURE__ */ jsxs(
    Button,
    {
      ref,
      variant,
      size,
      className: cn("absolute h-8 w-8 rounded-full", orientation === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90", className),
      disabled: !canScrollNext,
      onClick: scrollNext,
      ...props,
      children: [
        /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Next slide" })
      ]
    }
  );
});
CarouselNext.displayName = "CarouselNext";
const { LazyLoadImage } = LazyLoadImagePkg;
function TourDetail({ tour, config, seo }) {
  var _a;
  const [activeSection, setActiveSection] = useState("overview");
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [isNavSticky, setNavSticky] = useState(false);
  const [navTop, setNavTop] = useState(64);
  const { darkMode, fonts, currentFont, setHeaderShrunk } = useTheme();
  const tourNavRef = useRef(null);
  const bookingFormRef = useRef(null);
  const heroRef = useRef(null);
  const itineraryData = tour.itinerary || [];
  const galleryImages = tour.gallery_images_urls || [];
  const featuredImageUrl = (_a = tour.image) == null ? void 0 : _a.original_url;
  const getSeasonIcon = (seasonName) => {
    if (seasonName.includes("Düşük Sezon")) return "fas fa-snowflake text-blue-500";
    if (seasonName.includes("Orta Sezon")) return "fas fa-leaf text-green-500";
    if (seasonName.includes("Yüksek Sezon")) return "fas fa-sun text-orange-500";
    return "fas fa-dollar-sign text-green-500";
  };
  const pricingData = [];
  const groupedPricing = (tour.pricing_tiers || []).reduce((acc, tier) => {
    const seasonName = tier.season_name;
    if (!acc[seasonName]) acc[seasonName] = [];
    acc[seasonName].push(tier);
    return acc;
  }, {});
  for (const seasonName in groupedPricing) {
    const seasonMonths = config.seasons[seasonName] || "";
    const seasonNameWithMonths = `${seasonName} (${seasonMonths})`;
    const categoriesForSeason = (groupedPricing[seasonName] || []).map((tier) => ({
      name: tier.category_name,
      single: `€${tier.price_per_person_1}`,
      double: tier.price_per_person_2 ? `€${tier.price_per_person_2}` : "-",
      triple: tier.price_per_person_3 ? `€${tier.price_per_person_3}` : "-"
    }));
    pricingData.push({
      season: seasonNameWithMonths,
      icon: getSeasonIcon(seasonName),
      categories: categoriesForSeason
    });
  }
  const processedHotelData = Object.keys(tour.hotel_options || {}).map((cityName) => {
    const categoriesInCity = tour.hotel_options[cityName];
    const categories = { "Category A": [], "Category B": [], "Category C": [] };
    Object.keys(categoriesInCity).forEach((categoryName) => {
      if (categories[categoryName]) {
        categories[categoryName] = categoriesInCity[categoryName].map((hotel) => hotel.name);
      }
    });
    return {
      city_name: cityName,
      title: `${cityName} Otelleri`,
      description: `${cityName} şehrinde konaklayacağınız otellerin örnekleri aşağıda listelenmiştir. Otel müsaitliğine göre benzer standartlarda otellerde konaklama yapılacaktır.`,
      categories
    };
  });
  const handleNavClick = (e2, sectionId) => {
    e2.preventDefault();
    const section = document.getElementById(sectionId);
    if (section && tourNavRef.current && heroRef.current) {
      const isMobile = window.innerWidth < 768;
      const heroHeight = heroRef.current.offsetHeight;
      const navHeight = tourNavRef.current.offsetHeight;
      const headerHeight = 64;
      const shrunkHeaderHeight = 40;
      const sectionTop = section.offsetTop;
      const shouldShrinkAtTarget = isMobile && sectionTop > heroHeight - headerHeight;
      const effectiveHeaderHeightAtTarget = shouldShrinkAtTarget ? shrunkHeaderHeight : headerHeight;
      const scrollPadding = isMobile ? 10 : 20;
      const totalOffset = effectiveHeaderHeightAtTarget + navHeight + scrollPadding;
      const scrollToPosition = sectionTop - totalOffset;
      window.scrollTo({
        top: scrollToPosition,
        behavior: "smooth"
      });
    }
  };
  useEffect(() => {
    const handleScrollAndResize = () => {
      if (!tourNavRef.current || !bookingFormRef.current || !heroRef.current) return;
      const isMobile = window.innerWidth < 768;
      const heroHeight = heroRef.current.offsetHeight;
      const navHeight = tourNavRef.current.offsetHeight;
      const scrollPosition = window.scrollY;
      const headerHeight = 64;
      const shrunkHeaderHeight = 40;
      const shouldShrink = isMobile && scrollPosition > heroHeight - headerHeight;
      setHeaderShrunk(shouldShrink);
      const effectiveHeaderHeight = shouldShrink ? shrunkHeaderHeight : headerHeight;
      const stickyThreshold = heroHeight - effectiveHeaderHeight;
      if (scrollPosition > stickyThreshold) {
        setNavSticky(true);
        const bookingFormTop = bookingFormRef.current.offsetTop;
        const unstickyThreshold = bookingFormTop - navHeight - effectiveHeaderHeight;
        if (scrollPosition < unstickyThreshold) {
          setNavTop(effectiveHeaderHeight);
        } else {
          const newTop = unstickyThreshold - scrollPosition + effectiveHeaderHeight;
          setNavTop(newTop);
        }
      } else {
        setNavSticky(false);
        setNavTop(headerHeight);
      }
      const sections = ["overview", "itinerary", "pricing", "hotels", "optional"];
      const scrollSpyPadding = isMobile ? 10 : 20;
      const checkOffset = effectiveHeaderHeight + navHeight + scrollSpyPadding;
      const checkScrollPosition = scrollPosition + checkOffset;
      for (let i2 = sections.length - 1; i2 >= 0; i2--) {
        const section = document.getElementById(sections[i2]);
        if (section && section.offsetTop <= checkScrollPosition) {
          setActiveSection(sections[i2]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScrollAndResize);
    window.addEventListener("resize", handleScrollAndResize);
    handleScrollAndResize();
    return () => {
      window.removeEventListener("scroll", handleScrollAndResize);
      window.removeEventListener("resize", handleScrollAndResize);
      setHeaderShrunk(false);
    };
  }, [setHeaderShrunk]);
  return /* @__PURE__ */ jsx(Guest, { seo, children: /* @__PURE__ */ jsxs("div", { className: `bg-background text-foreground min-h-screen ${fonts[currentFont].class}`, children: [
    /* @__PURE__ */ jsxs("div", { ref: heroRef, className: "relative h-[60vh] md:h-[70vh] bg-cover bg-center", style: { backgroundImage: `url(${featuredImageUrl || "/images/placeholder.png"})` }, children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/45" }),
      /* @__PURE__ */ jsxs("div", { className: "relative max-w-6xl mx-auto px-4 h-full flex flex-col justify-center text-white", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 font-playfair animate-fade-in-up", children: tour == null ? void 0 : tour.title }),
        /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl mb-6 opacity-0 animate-fade-in-up animation-delay-300", children: tour == null ? void 0 : tour.summary }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center space-x-4 md:space-x-6 text-sm md:text-base opacity-0 animate-fade-in-up animation-delay-600", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx("i", { className: "fas fa-calendar-alt mr-2" }),
            /* @__PURE__ */ jsxs("span", { children: [
              tour == null ? void 0 : tour.duration_days,
              " Gün ",
              tour == null ? void 0 : tour.duration_nights,
              " Gece"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx("i", { className: "fas fa-users mr-2" }),
            /* @__PURE__ */ jsxs("span", { children: [
              tour == null ? void 0 : tour.min_participants,
              "-",
              tour == null ? void 0 : tour.max_participants,
              " Kişi"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx("i", { className: "fas fa-language mr-2" }),
            /* @__PURE__ */ jsx("span", { children: tour == null ? void 0 : tour.language })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx("i", { className: "fas fa-star text-yellow-400 mr-2" }),
            /* @__PURE__ */ jsxs("span", { children: [
              tour == null ? void 0 : tour.rating,
              " (",
              tour == null ? void 0 : tour.reviews_count,
              " değerlendirme)"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center mt-4 text-sm md:text-base opacity-0 animate-fade-in-up animation-delay-900", children: [
          /* @__PURE__ */ jsx("i", { className: "fas fa-map-marker-alt mr-2" }),
          /* @__PURE__ */ jsx("span", { children: Object.keys(tour.hotel_options || {}).join(", ") })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      "nav",
      {
        ref: tourNavRef,
        className: `w-full border-b border-border ${darkMode ? "bg-black/60" : "bg-white/60"} backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/60 ${isNavSticky ? "sticky z-40" : ""}`,
        style: { top: `${navTop}px` },
        children: /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 py-2", children: [
          /* @__PURE__ */ jsx("a", { href: "#overview", onClick: (e2) => handleNavClick(e2, "overview"), className: `px-4 py-2 rounded-md text-sm font-medium transition-colors leading-4 ${activeSection === "overview" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`, children: "Genel Bakış" }),
          /* @__PURE__ */ jsx("a", { href: "#itinerary", onClick: (e2) => handleNavClick(e2, "itinerary"), className: `px-4 py-2 rounded-md text-sm font-medium transition-colors leading-4 ${activeSection === "itinerary" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`, children: "Program" }),
          /* @__PURE__ */ jsx("a", { href: "#pricing", onClick: (e2) => handleNavClick(e2, "pricing"), className: `px-4 py-2 rounded-md text-sm font-medium transition-colors leading-4 ${activeSection === "pricing" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`, children: "Fiyatlar" }),
          /* @__PURE__ */ jsx("a", { href: "#hotels", onClick: (e2) => handleNavClick(e2, "hotels"), className: `px-4 py-2 rounded-md text-sm font-medium transition-colors leading-4 ${activeSection === "hotels" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`, children: "Oteller" }),
          /* @__PURE__ */ jsx("a", { href: "#optional", onClick: (e2) => handleNavClick(e2, "optional"), className: `px-4 py-2 rounded-md text-sm font-medium transition-colors leading-4 ${activeSection === "optional" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`, children: "Opsiyonel Aktiviteler" })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto px-4 py-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-8", children: [
        /* @__PURE__ */ jsx("section", { id: "overview", className: "space-y-6 ", children: /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-lg border border-border p-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4", children: "Tur Hakkında" }),
          tour.summary && /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground mb-4", children: tour.summary }),
          /* @__PURE__ */ jsx("div", { className: "prose prose-slate dark:prose-invert max-w-none", dangerouslySetInnerHTML: { __html: tour.description } }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-muted/50 rounded-lg p-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 text-primary mb-2", children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-check-circle" }),
                /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Garanti Başlangıç" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Her gün başlangıç garantisi" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-muted/50 rounded-lg p-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 text-primary mb-2", children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-users" }),
                /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Küçük Gruplar" })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
                tour.min_participants,
                "-",
                tour.max_participants,
                " kişilik gruplar"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 pb-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-lg border border-border p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "font-semibold mb-4 text-green-600", children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-check mr-2" }),
                "Dahil Olan Hizmetler"
              ] }),
              /* @__PURE__ */ jsx("div", { className: "space-y-1 text-sm", dangerouslySetInnerHTML: { __html: tour.inclusions_html } })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-lg border border-border p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "font-semibold mb-4 text-red-600", children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-times mr-2" }),
                "Dahil Olmayan Hizmetler"
              ] }),
              /* @__PURE__ */ jsx("div", { className: "space-y-1 text-sm", dangerouslySetInnerHTML: { __html: tour.exclusions_html } })
            ] })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-4 mt-4", children: "Fotoğraf Galerisi" }),
          galleryImages.length > 0 ? /* @__PURE__ */ jsxs(
            Carousel,
            {
              opts: { align: "start", loop: true },
              plugins: [Autoplay({ delay: 5e3 })],
              className: "w-full",
              children: [
                /* @__PURE__ */ jsx(CarouselContent, { children: galleryImages.map((image, index) => /* @__PURE__ */ jsx(CarouselItem, { className: "md:basis-1/2 lg:basis-1/3", children: /* @__PURE__ */ jsx("div", { className: "p-1", children: /* @__PURE__ */ jsx(Card, { className: "overflow-hidden cursor-pointer", onClick: () => setLightboxIndex(index), children: /* @__PURE__ */ jsx(CardContent, { className: "flex aspect-square items-center justify-center p-0", children: /* @__PURE__ */ jsx(
                  LazyLoadImage,
                  {
                    src: image.thumbnail_url,
                    alt: image.alt || `Galeri ${index + 1}`,
                    className: "w-full h-full object-cover transition-transform duration-300 hover:scale-110",
                    effect: "blur",
                    wrapperClassName: "w-full h-full"
                  }
                ) }) }) }) }, index)) }),
                /* @__PURE__ */ jsx(CarouselPrevious, { className: "ml-12" }),
                /* @__PURE__ */ jsx(CarouselNext, { className: "mr-12" })
              ]
            }
          ) : /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Görsel bulunmamaktadır." })
        ] }) }),
        /* @__PURE__ */ jsx(
          Lightbox,
          {
            open: lightboxIndex > -1,
            close: () => setLightboxIndex(-1),
            index: lightboxIndex,
            slides: galleryImages.map((img) => ({ src: img.original_url }))
          }
        ),
        /* @__PURE__ */ jsx("section", { id: "itinerary", className: "space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-lg border border-border p-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4", children: "Günlük Program" }),
          /* @__PURE__ */ jsx(Accordion, { type: "multiple", defaultValue: itineraryData.map((item) => `item-${item.day_number}`), className: "w-full", children: itineraryData.map((item) => /* @__PURE__ */ jsxs(AccordionItem, { value: `item-${item.day_number}`, className: "border border-gray-300 border-l-8 border-l-primary rounded-tr-lg rounded-br-lg mb-4 shadow-sm accordion-item-custom", children: [
            /* @__PURE__ */ jsx(AccordionTrigger, { className: "px-2 lg:px-6 py-4 hover:no-underline", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col items-start text-left", children: /* @__PURE__ */ jsx("h3", { className: "font-bold lg:text-xl text-lg text-foreground mb-1", children: item.title }) }) }),
            /* @__PURE__ */ jsx(AccordionContent, { className: "px-6 pb-4 pt-0", children: (item.activities || []).map((activity, activityIndex) => /* @__PURE__ */ jsx("div", { className: `mb-2 ${activity.is_highlight ? "bg-blue-50 p-3 rounded-md" : ""}`, children: /* @__PURE__ */ jsx("div", { className: "prose prose-slate dark:prose-invert max-w-none prose-sm", dangerouslySetInnerHTML: { __html: activity.description } }) }, `activity-${item.day_number}-${activityIndex}`)) })
          ] }, item.day_number)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { id: "pricing", className: "space-y-1 lg:space-y-0", children: /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-lg border border-border p-4 lg:p-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-6", children: "Sezon Fiyatları" }),
          pricingData.map((seasonItem, index) => /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center", children: [
              /* @__PURE__ */ jsx("i", { className: `${seasonItem.icon} mr-2` }),
              seasonItem.season
            ] }),
            /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full border-collapse", children: [
              /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ jsx("th", { className: "text-left p-3", children: "Kategori" }),
                /* @__PURE__ */ jsx("th", { className: "text-left p-3", children: "Tek Kişilik" }),
                /* @__PURE__ */ jsx("th", { className: "text-left p-3", children: "Çift Kişilik" }),
                /* @__PURE__ */ jsx("th", { className: "text-left p-3", children: "Üçlü Kişilik" })
              ] }) }),
              /* @__PURE__ */ jsx("tbody", { children: seasonItem.categories.map((category, catIndex) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-border last:border-b-0", children: [
                /* @__PURE__ */ jsx("td", { className: "p-3 font-medium", children: category.name }),
                /* @__PURE__ */ jsx("td", { className: "p-3", children: category.single || "-" }),
                /* @__PURE__ */ jsx("td", { className: "p-3", children: category.double || "-" }),
                /* @__PURE__ */ jsx("td", { className: "p-3", children: category.triple || "-" })
              ] }, catIndex)) })
            ] }) })
          ] }, index)),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 p-4 bg-muted/50 rounded-lg", children: [
            /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-2", children: "Ödeme Koşulları" }),
            /* @__PURE__ */ jsxs("ul", { className: "text-sm text-muted-foreground space-y-1", children: [
              /* @__PURE__ */ jsx("li", { children: "• Rezervasyon için %20 avans ödemesi gereklidir" }),
              /* @__PURE__ */ jsx("li", { children: "• Kalan tutar İstanbul'daki ofisimizde ödenebilir" }),
              /* @__PURE__ */ jsx("li", { children: "• Visa, MasterCard, Maestro kartları kabul edilir" }),
              /* @__PURE__ */ jsx("li", { children: "• Online ödeme mümkündür" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("section", { id: "hotels", className: "space-y-6 ", children: /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-lg border border-border p-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4", children: "Konaklama Seçenekleri" }),
          processedHotelData.length > 0 ? processedHotelData.map((cityData, cityIndex) => /* @__PURE__ */ jsxs("div", { className: "mb-8 last:mb-0", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-4 text-foreground", children: cityData.title }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-4", children: cityData.description }),
            /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full border-collapse table-auto", children: [
              /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-muted/50 text-muted-foreground", children: [
                /* @__PURE__ */ jsx("th", { className: "text-left p-3 w-1/3", children: "Category A" }),
                /* @__PURE__ */ jsx("th", { className: "text-left p-3 w-1/3", children: "Category B" }),
                /* @__PURE__ */ jsx("th", { className: "text-left p-3 w-1/3", children: "Category C" })
              ] }) }),
              /* @__PURE__ */ jsx("tbody", { children: Array.from({ length: Math.max((cityData.categories["Category A"] || []).length, (cityData.categories["Category B"] || []).length, (cityData.categories["Category C"] || []).length) }).map((_, rowIndex) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-border last:border-b-0", children: [
                /* @__PURE__ */ jsx("td", { className: "p-3 text-sm text-foreground", children: (cityData.categories["Category A"] || [])[rowIndex] || "" }),
                /* @__PURE__ */ jsx("td", { className: "p-3 text-sm text-foreground", children: (cityData.categories["Category B"] || [])[rowIndex] || "" }),
                /* @__PURE__ */ jsx("td", { className: "p-3 text-sm text-foreground", children: (cityData.categories["Category C"] || [])[rowIndex] || "" })
              ] }, `${cityIndex}-${rowIndex}`)) })
            ] }) })
          ] }, cityIndex)) : /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Bu tur için otel bilgisi bulunmamaktadır." })
        ] }) }),
        /* @__PURE__ */ jsx("section", { id: "optional", className: "space-y-6 ", children: /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-lg border border-border p-6 shadow-sm", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4", children: "Opsiyonel Aktiviteler" }),
          (tour.optional_activities || []).length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: (tour.optional_activities || []).map((activity) => {
            var _a2;
            return /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-lg border border-border overflow-hidden shadow-sm", children: [
              /* @__PURE__ */ jsx("div", { className: "w-full h-48", children: ((_a2 = activity.image) == null ? void 0 : _a2.thumbnail_url) ? /* @__PURE__ */ jsx(
                LazyLoadImage,
                {
                  src: activity.image.thumbnail_url,
                  alt: activity.name,
                  className: "w-full h-full object-cover",
                  effect: "blur",
                  wrapperClassName: "w-full h-full"
                }
              ) : /* @__PURE__ */ jsx("div", { className: "w-full h-48 flex items-center justify-center bg-gray-200 text-gray-500", children: "Görsel Yok" }) }),
              /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg mb-2 text-foreground", children: activity.name }),
                /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground mb-4", dangerouslySetInnerHTML: { __html: activity.description } }),
                /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-primary", children: activity.price ? `€${activity.price}` : "Fiyat Belirtilmemiş" }) })
              ] })
            ] }, activity.id);
          }) }) : /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Bu tur için opsiyonel aktivite bulunmamaktadır." })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsx("div", { ref: bookingFormRef, className: "sticky top-32", children: /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-lg border border-border p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-6", children: "Hızlı Rezervasyon" }),
        /* @__PURE__ */ jsxs("form", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "date", children: "Tarih" }),
            /* @__PURE__ */ jsx(Input, { id: "date", type: "date" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "people", children: "Kişi Sayısı" }),
            /* @__PURE__ */ jsxs(Select, { children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Kişi sayısı seçin" }) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "1", children: "1 Kişi" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "2", children: "2 Kişi" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "3", children: "3 Kişi" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "4", children: "4 Kişi" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "5+", children: "5+ Kişi" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "category", children: "Kategori" }),
            /* @__PURE__ */ jsxs(Select, { children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Kategori seçin" }) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "category_a_code", children: "Kategori A" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "category_b_code", children: "Kategori B" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "category_c_code", children: "Kategori C" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "fullname", children: "Ad Soyad" }),
            /* @__PURE__ */ jsx(Input, { id: "fullname", type: "text", placeholder: "Adınız ve soyadınız" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "E-posta" }),
            /* @__PURE__ */ jsx(Input, { id: "email", type: "email", placeholder: "ornek@email.com" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "phone", children: "Telefon" }),
            /* @__PURE__ */ jsx(Input, { id: "phone", type: "tel", placeholder: "+90 5XX XXX XX XX" })
          ] }),
          /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full bg-primary text-primary-foreground hover:bg-primary/90", children: "Rezervasyon Yap" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 p-4 bg-muted rounded-lg", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-2", children: "İletişim" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx("i", { className: "fas fa-phone mr-2 text-primary" }),
              "+90 212 123 45 67"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx("i", { className: "fas fa-envelope mr-2 text-primary" }),
              "info@turkiyetours.com"
            ] })
          ] })
        ] })
      ] }) }) })
    ] }) })
  ] }) });
}
const __vite_glob_0_27 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: TourDetail
}, Symbol.toStringTag, { value: "Module" }));
function Tours({ tours: backendTours, allDestinations, filters, seo }) {
  const { fonts, currentFont, setHeaderShrunk } = useTheme();
  const [isFilterBarSticky, setFilterBarSticky] = useState(false);
  const [filterBarTop, setFilterBarTop] = useState(64);
  const filterBarRef = useRef(null);
  const tourListRef = useRef(null);
  useRef(true);
  const tours = backendTours.data;
  const paginationLinks = backendTours.links;
  const [selectedDestinations, setSelectedDestinations] = useState(
    filters.destinations ? Array.isArray(filters.destinations) ? filters.destinations : filters.destinations.split(",") : []
  );
  const [selectedDurations, setSelectedDurations] = useState(
    filters.duration_range ? Array.isArray(filters.duration_range) ? filters.duration_range : filters.duration_range.split(",") : []
  );
  const [selectedPrices, setSelectedPrices] = useState(
    filters.price_range ? Array.isArray(filters.price_range) ? filters.price_range : filters.price_range.split(",") : []
  );
  const hasActiveFilters = filters.destinations && filters.destinations !== "all" && filters.destinations.length > 0 || filters.duration_range && filters.duration_range !== "all" && filters.duration_range.length > 0 || filters.price_range && filters.price_range !== "all" && filters.price_range.length > 0;
  const destinations = [{ value: "all", label: "Tümü" }, ...allDestinations.map((dest) => ({ value: dest.slug, label: dest.name }))];
  const durations = [
    { value: "all", label: "Tümü" },
    { value: "3-5", label: "3-5 Gün" },
    { value: "6-10", label: "6-10 Gün" },
    { value: "10-1000", label: "10+ Gün" }
  ];
  const prices = [
    { value: "all", label: "Tümü" },
    { value: "0-500", label: "€0 - €500" },
    { value: "501-1000", label: "€501 - €1000" },
    { value: "1001-100000", label: "€1000+" }
  ];
  const handleMultiSelectChange = (list, setList, itemValue) => {
    if (itemValue === "all") {
      setList([]);
    } else if (list.includes(itemValue)) {
      setList(list.filter((item) => item !== itemValue));
    } else {
      setList([...list, itemValue]);
    }
  };
  const applyFilters = () => {
    const queryParams = {};
    if (selectedDestinations.length > 0 && !selectedDestinations.includes("all")) {
      queryParams.destinations = selectedDestinations.join(",");
    }
    if (selectedDurations.length > 0 && !selectedDurations.includes("all")) {
      queryParams.duration_range = selectedDurations.join(",");
    }
    if (selectedPrices.length > 0 && !selectedPrices.includes("all")) {
      queryParams.price_range = selectedPrices.join(",");
    }
    router$1.get(route("tours.index"), queryParams, {
      preserveState: true,
      preserveScroll: true,
      replace: true
    });
  };
  const clearFilters = () => {
    setSelectedDestinations([]);
    setSelectedDurations([]);
    setSelectedPrices([]);
    router$1.get(route("tours.index"), {}, {
      preserveState: true,
      replace: true,
      onSuccess: () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  };
  useEffect(() => {
    const handleScrollAndResize = () => {
      if (!filterBarRef.current) return;
      const scrollPosition = window.scrollY;
      const initialOffset = filterBarRef.current.offsetTop;
      const headerHeight = 64;
      const activationPoint = initialOffset - headerHeight;
      if (scrollPosition > activationPoint && activationPoint > 0) {
        setFilterBarSticky(true);
        setFilterBarTop(headerHeight);
      } else {
        setFilterBarSticky(false);
      }
    };
    window.addEventListener("scroll", handleScrollAndResize);
    window.addEventListener("resize", handleScrollAndResize);
    return () => {
      window.removeEventListener("scroll", handleScrollAndResize);
      window.removeEventListener("resize", handleScrollAndResize);
      setHeaderShrunk(false);
    };
  }, [setHeaderShrunk]);
  return /* @__PURE__ */ jsx(Guest, { seo, children: /* @__PURE__ */ jsx("div", { className: `tours-page bg-background text-foreground min-h-screen ${fonts[currentFont].class}`, children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-4", children: [
    /* @__PURE__ */ jsx("div", { className: "py-6", children: /* @__PURE__ */ jsxs(
      "section",
      {
        ref: filterBarRef,
        className: `tours-filter-bar bg-card p-4 rounded-lg shadow-sm z-30 transition-all duration-300 ${isFilterBarSticky ? "sticky" : "relative"}`,
        style: { top: isFilterBarSticky ? `${filterBarTop}px` : "auto" },
        children: [
          /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "tours-destination-filter flex-grow", style: { flexBasis: "33.33%" }, children: /* @__PURE__ */ jsxs(Popover, { children: [
              /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "w-full justify-between tours-destination-button", children: [
                selectedDestinations.length > 0 ? selectedDestinations.map((val) => {
                  var _a;
                  return (_a = destinations.find((d) => d.value === val)) == null ? void 0 : _a.label;
                }).join(", ") : "Destinasyon",
                /* @__PURE__ */ jsx(ChevronDown, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })
              ] }) }),
              /* @__PURE__ */ jsx(PopoverContent, { className: "w-[--radix-popover-trigger-width] p-0 tours-destination-popover", children: destinations.map((destination) => /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-2 tours-destination-item hover:bg-muted", children: /* @__PURE__ */ jsxs(Label, { htmlFor: `dest-${destination.value}`, className: "flex items-center space-x-2 cursor-pointer w-full h-full p-2 text-muted-foreground", children: [
                /* @__PURE__ */ jsx(
                  Checkbox,
                  {
                    id: `dest-${destination.value}`,
                    checked: selectedDestinations.includes(destination.value) || selectedDestinations.length === 0 && destination.value === "all",
                    onCheckedChange: () => handleMultiSelectChange(selectedDestinations, setSelectedDestinations, destination.value)
                  }
                ),
                /* @__PURE__ */ jsx("span", { children: destination.label })
              ] }) }, destination.value)) })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "tours-duration-filter flex-grow", style: { flexBasis: "25%" }, children: /* @__PURE__ */ jsxs(Popover, { children: [
              /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "w-full justify-between tours-duration-button", children: [
                selectedDurations.length > 0 ? selectedDurations.map((val) => {
                  var _a;
                  return (_a = durations.find((d) => d.value === val)) == null ? void 0 : _a.label;
                }).join(", ") : "Süre",
                /* @__PURE__ */ jsx(ChevronDown, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })
              ] }) }),
              /* @__PURE__ */ jsx(PopoverContent, { className: "w-[--radix-popover-trigger-width] p-0 tours-duration-popover", children: durations.map((duration) => /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-2 tours-duration-item hover:bg-muted", children: /* @__PURE__ */ jsxs(Label, { htmlFor: `duration-${duration.value}`, className: "flex items-center space-x-2 cursor-pointer w-full h-full p-2 text-muted-foreground", children: [
                /* @__PURE__ */ jsx(
                  Checkbox,
                  {
                    id: `duration-${duration.value}`,
                    checked: selectedDurations.includes(duration.value) || selectedDurations.length === 0 && duration.value === "all",
                    onCheckedChange: () => handleMultiSelectChange(selectedDurations, setSelectedDurations, duration.value)
                  }
                ),
                /* @__PURE__ */ jsx("span", { children: duration.label })
              ] }) }, duration.value)) })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "tours-price-filter flex-grow", style: { flexBasis: "25%" }, children: /* @__PURE__ */ jsxs(Popover, { children: [
              /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "w-full justify-between tours-price-button", children: [
                selectedPrices.length > 0 ? selectedPrices.map((val) => {
                  var _a;
                  return (_a = prices.find((p) => p.value === val)) == null ? void 0 : _a.label;
                }).join(", ") : "Fiyat Aralığı",
                /* @__PURE__ */ jsx(ChevronDown, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })
              ] }) }),
              /* @__PURE__ */ jsx(PopoverContent, { className: "w-[--radix-popover-trigger-width] p-0 tours-price-popover", children: prices.map((price) => /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-2 tours-price-item hover:bg-muted", children: /* @__PURE__ */ jsxs(Label, { htmlFor: `price-${price.value}`, className: "flex items-center space-x-2 cursor-pointer w-full h-full p-2 text-muted-foreground", children: [
                /* @__PURE__ */ jsx(
                  Checkbox,
                  {
                    id: `price-${price.value}`,
                    checked: selectedPrices.includes(price.value) || selectedPrices.length === 0 && price.value === "all",
                    onCheckedChange: () => handleMultiSelectChange(selectedPrices, setSelectedPrices, price.value)
                  }
                ),
                /* @__PURE__ */ jsx("span", { children: price.label })
              ] }) }, price.value)) })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2 flex-grow", style: { flexBasis: "16.66%" }, children: [
              /* @__PURE__ */ jsx(Button, { onClick: () => applyFilters(), className: "tours-filter-apply-button w-full", children: "Filtrele" }),
              hasActiveFilters && /* @__PURE__ */ jsx(Button, { onClick: clearFilters, variant: "outline", className: "tours-clear-filters-button", children: "Temizle" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "md:hidden", children: /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "w-full", children: /* @__PURE__ */ jsxs(AccordionItem, { value: "filters", children: [
            /* @__PURE__ */ jsx(AccordionTrigger, { children: "Filtreler" }),
            /* @__PURE__ */ jsx(AccordionContent, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-4 pt-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "tours-destination-filter space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { children: "Destinasyon" }),
                /* @__PURE__ */ jsxs(Popover, { children: [
                  /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "w-full justify-between tours-destination-button", children: [
                    selectedDestinations.length > 0 ? selectedDestinations.map((val) => {
                      var _a;
                      return (_a = destinations.find((d) => d.value === val)) == null ? void 0 : _a.label;
                    }).join(", ") : "Seçim Yapın",
                    /* @__PURE__ */ jsx(ChevronDown, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })
                  ] }) }),
                  /* @__PURE__ */ jsx(PopoverContent, { className: "w-[--radix-popover-trigger-width] p-0 tours-destination-popover", children: destinations.map((destination) => /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-2 tours-destination-item hover:bg-muted", children: /* @__PURE__ */ jsxs(Label, { htmlFor: `mobile-dest-${destination.value}`, className: "flex items-center space-x-2 cursor-pointer w-full h-full p-2 text-muted-foreground", children: [
                    /* @__PURE__ */ jsx(
                      Checkbox,
                      {
                        id: `mobile-dest-${destination.value}`,
                        checked: selectedDestinations.includes(destination.value) || selectedDestinations.length === 0 && destination.value === "all",
                        onCheckedChange: () => handleMultiSelectChange(selectedDestinations, setSelectedDestinations, destination.value)
                      }
                    ),
                    /* @__PURE__ */ jsx("span", { children: destination.label })
                  ] }) }, destination.value)) })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "tours-duration-filter space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { children: "Süre" }),
                /* @__PURE__ */ jsxs(Popover, { children: [
                  /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "w-full justify-between tours-duration-button", children: [
                    selectedDurations.length > 0 ? selectedDurations.map((val) => {
                      var _a;
                      return (_a = durations.find((d) => d.value === val)) == null ? void 0 : _a.label;
                    }).join(", ") : "Seçim Yapın",
                    /* @__PURE__ */ jsx(ChevronDown, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })
                  ] }) }),
                  /* @__PURE__ */ jsx(PopoverContent, { className: "w-[--radix-popover-trigger-width] p-0 tours-duration-popover", children: durations.map((duration) => /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-2 tours-duration-item hover:bg-muted", children: /* @__PURE__ */ jsxs(Label, { htmlFor: `mobile-duration-${duration.value}`, className: "flex items-center space-x-2 cursor-pointer w-full h-full p-2 text-muted-foreground", children: [
                    /* @__PURE__ */ jsx(
                      Checkbox,
                      {
                        id: `mobile-duration-${duration.value}`,
                        checked: selectedDurations.includes(duration.value) || selectedDurations.length === 0 && duration.value === "all",
                        onCheckedChange: () => handleMultiSelectChange(selectedDurations, setSelectedDurations, duration.value)
                      }
                    ),
                    /* @__PURE__ */ jsx("span", { children: duration.label })
                  ] }) }, duration.value)) })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "tours-price-filter space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { children: "Fiyat Aralığı" }),
                /* @__PURE__ */ jsxs(Popover, { children: [
                  /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "w-full justify-between tours-price-button", children: [
                    selectedPrices.length > 0 ? selectedPrices.map((val) => {
                      var _a;
                      return (_a = prices.find((p) => p.value === val)) == null ? void 0 : _a.label;
                    }).join(", ") : "Seçim Yapın",
                    /* @__PURE__ */ jsx(ChevronDown, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })
                  ] }) }),
                  /* @__PURE__ */ jsx(PopoverContent, { className: "w-[--radix-popover-trigger-width] p-0 tours-price-popover", children: prices.map((price) => /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-2 tours-price-item hover:bg-muted", children: /* @__PURE__ */ jsxs(Label, { htmlFor: `mobile-price-${price.value}`, className: "flex items-center space-x-2 cursor-pointer w-full h-full p-2 text-muted-foreground", children: [
                    /* @__PURE__ */ jsx(
                      Checkbox,
                      {
                        id: `mobile-price-${price.value}`,
                        checked: selectedPrices.includes(price.value) || selectedPrices.length === 0 && price.value === "all",
                        onCheckedChange: () => handleMultiSelectChange(selectedPrices, setSelectedPrices, price.value)
                      }
                    ),
                    /* @__PURE__ */ jsx("span", { children: price.label })
                  ] }) }, price.value)) })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
                /* @__PURE__ */ jsx(Button, { onClick: () => applyFilters(), className: "tours-filter-apply-button w-full", children: "Filtrele" }),
                hasActiveFilters && /* @__PURE__ */ jsx(Button, { onClick: clearFilters, variant: "outline", className: "tours-clear-filters-button w-full", children: "Temizle" })
              ] })
            ] }) })
          ] }) }) })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx("section", { ref: tourListRef, className: "tours-main-content pt-6 md:pt-0 pb-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
      tours.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: tours.map((tour) => /* @__PURE__ */ jsx(TourCard, { tour, featuredBadge: FeaturedBadgeCorner }, tour.id)) }) : /* @__PURE__ */ jsx("p", { className: "text-center text-muted-foreground text-lg mt-8 tours-no-tours-message", children: "Filtreleme kriterlerinize uygun tur bulunamadı." }),
      paginationLinks && paginationLinks.length > 3 && /* @__PURE__ */ jsx("div", { className: "mt-12 flex justify-center tours-pagination", children: /* @__PURE__ */ jsx("nav", { className: "flex items-center space-x-2", children: paginationLinks.map((link, index) => /* @__PURE__ */ jsx(
        Link,
        {
          href: link.url || "#",
          className: `px-4 py-2 rounded-md text-sm font-medium ${link.active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"} ${!link.url ? "opacity-50 cursor-not-allowed" : ""} tours-pagination-link`,
          preserveScroll: true,
          dangerouslySetInnerHTML: { __html: link.label }
        },
        link.label || index
      )) }) })
    ] }) }) })
  ] }) }) });
}
const __vite_glob_0_28 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Tours
}, Symbol.toStringTag, { value: "Module" }));
function Welcome({ auth, laravelVersion, phpVersion }) {
  const handleImageError = () => {
    var _a, _b, _c, _d;
    (_a = document.getElementById("screenshot-container")) == null ? void 0 : _a.classList.add("!hidden");
    (_b = document.getElementById("docs-card")) == null ? void 0 : _b.classList.add("!row-span-1");
    (_c = document.getElementById("docs-card-content")) == null ? void 0 : _c.classList.add("!flex-row");
    (_d = document.getElementById("background")) == null ? void 0 : _d.classList.add("!hidden");
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Welcome" }),
    /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 text-black/50 dark:bg-black dark:text-white/50", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          id: "background",
          className: "absolute -left-20 top-0 max-w-[877px]",
          src: "https://laravel.com/assets/img/welcome/background.svg"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white", children: /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-2xl px-6 lg:max-w-7xl", children: [
        /* @__PURE__ */ jsxs("header", { className: "grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3", children: [
          /* @__PURE__ */ jsx("div", { className: "flex lg:col-start-2 lg:justify-center", children: /* @__PURE__ */ jsx(
            "svg",
            {
              className: "h-12 w-auto text-white lg:h-16 lg:text-[#FF2D20]",
              viewBox: "0 0 62 65",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M61.8548 14.6253C61.8778 14.7102 61.8895 14.7978 61.8897 14.8858V28.5615C61.8898 28.737 61.8434 28.9095 61.7554 29.0614C61.6675 29.2132 61.5409 29.3392 61.3887 29.4265L49.9104 36.0351V49.1337C49.9104 49.4902 49.7209 49.8192 49.4118 49.9987L25.4519 63.7916C25.3971 63.8227 25.3372 63.8427 25.2774 63.8639C25.255 63.8714 25.2338 63.8851 25.2101 63.8913C25.0426 63.9354 24.8666 63.9354 24.6991 63.8913C24.6716 63.8838 24.6467 63.8689 24.6205 63.8589C24.5657 63.8389 24.5084 63.8215 24.456 63.7916L0.501061 49.9987C0.348882 49.9113 0.222437 49.7853 0.134469 49.6334C0.0465019 49.4816 0.000120578 49.3092 0 49.1337L0 8.10652C0 8.01678 0.0124642 7.92953 0.0348998 7.84477C0.0423783 7.8161 0.0598282 7.78993 0.0697995 7.76126C0.0884958 7.70891 0.105946 7.65531 0.133367 7.6067C0.152063 7.5743 0.179485 7.54812 0.20192 7.51821C0.230588 7.47832 0.256763 7.43719 0.290416 7.40229C0.319084 7.37362 0.356476 7.35243 0.388883 7.32751C0.425029 7.29759 0.457436 7.26518 0.498568 7.2415L12.4779 0.345059C12.6296 0.257786 12.8015 0.211853 12.9765 0.211853C13.1515 0.211853 13.3234 0.257786 13.475 0.345059L25.4531 7.2415H25.4556C25.4955 7.26643 25.5292 7.29759 25.5653 7.32626C25.5977 7.35119 25.6339 7.37362 25.6625 7.40104C25.6974 7.43719 25.7224 7.47832 25.7523 7.51821C25.7735 7.54812 25.8021 7.5743 25.8196 7.6067C25.8483 7.65656 25.8645 7.70891 25.8844 7.76126C25.8944 7.78993 25.9118 7.8161 25.9193 7.84602C25.9423 7.93096 25.954 8.01853 25.9542 8.10652V33.7317L35.9355 27.9844V14.8846C35.9355 14.7973 35.948 14.7088 35.9704 14.6253C35.9792 14.5954 35.9954 14.5692 36.0053 14.5405C36.0253 14.4882 36.0427 14.4346 36.0702 14.386C36.0888 14.3536 36.1163 14.3274 36.1375 14.2975C36.1674 14.2576 36.1923 14.2165 36.2272 14.1816C36.2559 14.1529 36.292 14.1317 36.3244 14.1068C36.3618 14.0769 36.3942 14.0445 36.4341 14.0208L48.4147 7.12434C48.5663 7.03694 48.7383 6.99094 48.9133 6.99094C49.0883 6.99094 49.2602 7.03694 49.4118 7.12434L61.3899 14.0208C61.4323 14.0457 61.4647 14.0769 61.5021 14.1055C61.5333 14.1305 61.5694 14.1529 61.5981 14.1803C61.633 14.2165 61.6579 14.2576 61.6878 14.2975C61.7103 14.3274 61.7377 14.3536 61.7551 14.386C61.7838 14.4346 61.8 14.4882 61.8199 14.5405C61.8312 14.5692 61.8474 14.5954 61.8548 14.6253ZM59.893 27.9844V16.6121L55.7013 19.0252L49.9104 22.3593V33.7317L59.8942 27.9844H59.893ZM47.9149 48.5566V37.1768L42.2187 40.4299L25.953 49.7133V61.2003L47.9149 48.5566ZM1.99677 9.83281V48.5566L23.9562 61.199V49.7145L12.4841 43.2219L12.4804 43.2194L12.4754 43.2169C12.4368 43.1945 12.4044 43.1621 12.3682 43.1347C12.3371 43.1097 12.3009 43.0898 12.2735 43.0624L12.271 43.0586C12.2386 43.0275 12.2162 42.9888 12.1887 42.9539C12.1638 42.9203 12.1339 42.8916 12.114 42.8567L12.1127 42.853C12.0903 42.8156 12.0766 42.7707 12.0604 42.7283C12.0442 42.6909 12.023 42.656 12.013 42.6161C12.0005 42.5688 11.998 42.5177 11.9931 42.4691C11.9881 42.4317 11.9781 42.3943 11.9781 42.3569V15.5801L6.18848 12.2446L1.99677 9.83281ZM12.9777 2.36177L2.99764 8.10652L12.9752 13.8513L22.9541 8.10527L12.9752 2.36177H12.9777ZM18.1678 38.2138L23.9574 34.8809V9.83281L19.7657 12.2459L13.9749 15.5801V40.6281L18.1678 38.2138ZM48.9133 9.14105L38.9344 14.8858L48.9133 20.6305L58.8909 14.8846L48.9133 9.14105ZM47.9149 22.3593L42.124 19.0252L37.9323 16.6121V27.9844L43.7219 31.3174L47.9149 33.7317V22.3593ZM24.9533 47.987L39.59 39.631L46.9065 35.4555L36.9352 29.7145L25.4544 36.3242L14.9907 42.3482L24.9533 47.987Z",
                  fill: "currentColor"
                }
              )
            }
          ) }),
          /* @__PURE__ */ jsx("nav", { className: "-mx-3 flex flex-1 justify-end", children: auth.user ? /* @__PURE__ */ jsx(
            Link,
            {
              href: route("dashboard"),
              className: "rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white",
              children: "Dashboard"
            }
          ) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("login"),
                className: "rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white",
                children: "Log in"
              }
            ),
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("register"),
                className: "rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white",
                children: "Register"
              }
            )
          ] }) })
        ] }),
        /* @__PURE__ */ jsx("main", { className: "mt-6", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-2 lg:gap-8", children: [
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://laravel.com/docs",
              id: "docs-card",
              className: "flex flex-col items-start gap-6 overflow-hidden rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] md:row-span-3 lg:p-10 lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]",
              children: [
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    id: "screenshot-container",
                    className: "relative flex w-full flex-1 items-stretch",
                    children: [
                      /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: "https://laravel.com/assets/img/welcome/docs-light.svg",
                          alt: "Laravel documentation screenshot",
                          className: "aspect-video h-full w-full flex-1 rounded-[10px] object-cover object-top drop-shadow-[0px_4px_34px_rgba(0,0,0,0.06)] dark:hidden",
                          onError: handleImageError
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: "https://laravel.com/assets/img/welcome/docs-dark.svg",
                          alt: "Laravel documentation screenshot",
                          className: "hidden aspect-video h-full w-full flex-1 rounded-[10px] object-cover object-top drop-shadow-[0px_4px_34px_rgba(0,0,0,0.25)] dark:block"
                        }
                      ),
                      /* @__PURE__ */ jsx("div", { className: "absolute -bottom-16 -left-16 h-40 w-[calc(100%+8rem)] bg-gradient-to-b from-transparent via-white to-white dark:via-zinc-900 dark:to-zinc-900" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "relative flex items-center gap-6 lg:items-end", children: [
                  /* @__PURE__ */ jsxs(
                    "div",
                    {
                      id: "docs-card-content",
                      className: "flex items-start gap-6 lg:flex-col",
                      children: [
                        /* @__PURE__ */ jsx("div", { className: "flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16", children: /* @__PURE__ */ jsxs(
                          "svg",
                          {
                            className: "size-5 sm:size-6",
                            xmlns: "http://www.w3.org/2000/svg",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            children: [
                              /* @__PURE__ */ jsx(
                                "path",
                                {
                                  fill: "#FF2D20",
                                  d: "M23 4a1 1 0 0 0-1.447-.894L12.224 7.77a.5.5 0 0 1-.448 0L2.447 3.106A1 1 0 0 0 1 4v13.382a1.99 1.99 0 0 0 1.105 1.79l9.448 4.728c.14.065.293.1.447.1.154-.005.306-.04.447-.105l9.453-4.724a1.99 1.99 0 0 0 1.1-1.789V4ZM3 6.023a.25.25 0 0 1 .362-.223l7.5 3.75a.251.251 0 0 1 .138.223v11.2a.25.25 0 0 1-.362.224l-7.5-3.75a.25.25 0 0 1-.138-.22V6.023Zm18 11.2a.25.25 0 0 1-.138.224l-7.5 3.75a.249.249 0 0 1-.329-.099.249.249 0 0 1-.033-.12V9.772a.251.251 0 0 1 .138-.224l7.5-3.75a.25.25 0 0 1 .362.224v11.2Z"
                                }
                              ),
                              /* @__PURE__ */ jsx(
                                "path",
                                {
                                  fill: "#FF2D20",
                                  d: "m3.55 1.893 8 4.048a1.008 1.008 0 0 0 .9 0l8-4.048a1 1 0 0 0-.9-1.785l-7.322 3.706a.506.506 0 0 1-.452 0L4.454.108a1 1 0 0 0-.9 1.785H3.55Z"
                                }
                              )
                            ]
                          }
                        ) }),
                        /* @__PURE__ */ jsxs("div", { className: "pt-3 sm:pt-5 lg:pt-0", children: [
                          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-black dark:text-white", children: "Documentation" }),
                          /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm/relaxed", children: "Laravel has wonderful documentation covering every aspect of the framework. Whether you are a newcomer or have prior experience with Laravel, we recommend reading our documentation from beginning to end." })
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "svg",
                    {
                      className: "size-6 shrink-0 stroke-[#FF2D20]",
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      strokeWidth: "1.5",
                      children: /* @__PURE__ */ jsx(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          d: "M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                        }
                      )
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://laracasts.com",
              className: "flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]",
              children: [
                /* @__PURE__ */ jsx("div", { className: "flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16", children: /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "size-5 sm:size-6",
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx("g", { fill: "#FF2D20", children: /* @__PURE__ */ jsx("path", { d: "M24 8.25a.5.5 0 0 0-.5-.5H.5a.5.5 0 0 0-.5.5v12a2.5 2.5 0 0 0 2.5 2.5h19a2.5 2.5 0 0 0 2.5-2.5v-12Zm-7.765 5.868a1.221 1.221 0 0 1 0 2.264l-6.626 2.776A1.153 1.153 0 0 1 8 18.123v-5.746a1.151 1.151 0 0 1 1.609-1.035l6.626 2.776ZM19.564 1.677a.25.25 0 0 0-.177-.427H15.6a.106.106 0 0 0-.072.03l-4.54 4.543a.25.25 0 0 0 .177.427h3.783c.027 0 .054-.01.073-.03l4.543-4.543ZM22.071 1.318a.047.047 0 0 0-.045.013l-4.492 4.492a.249.249 0 0 0 .038.385.25.25 0 0 0 .14.042h5.784a.5.5 0 0 0 .5-.5v-2a2.5 2.5 0 0 0-1.925-2.432ZM13.014 1.677a.25.25 0 0 0-.178-.427H9.101a.106.106 0 0 0-.073.03l-4.54 4.543a.25.25 0 0 0 .177.427H8.4a.106.106 0 0 0 .073-.03l4.54-4.543ZM6.513 1.677a.25.25 0 0 0-.177-.427H2.5A2.5 2.5 0 0 0 0 3.75v2a.5.5 0 0 0 .5.5h1.4a.106.106 0 0 0 .073-.03l4.54-4.543Z" }) })
                  }
                ) }),
                /* @__PURE__ */ jsxs("div", { className: "pt-3 sm:pt-5", children: [
                  /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-black dark:text-white", children: "Laracasts" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm/relaxed", children: "Laracasts offers thousands of video tutorials on Laravel, PHP, and JavaScript development. Check them out, see for yourself, and massively level up your development skills in the process." })
                ] }),
                /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "size-6 shrink-0 self-center stroke-[#FF2D20]",
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    strokeWidth: "1.5",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                      }
                    )
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://laravel-news.com",
              className: "flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]",
              children: [
                /* @__PURE__ */ jsx("div", { className: "flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16", children: /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "size-5 sm:size-6",
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsxs("g", { fill: "#FF2D20", children: [
                      /* @__PURE__ */ jsx("path", { d: "M8.75 4.5H5.5c-.69 0-1.25.56-1.25 1.25v4.75c0 .69.56 1.25 1.25 1.25h3.25c.69 0 1.25-.56 1.25-1.25V5.75c0-.69-.56-1.25-1.25-1.25Z" }),
                      /* @__PURE__ */ jsx("path", { d: "M24 10a3 3 0 0 0-3-3h-2V2.5a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2V20a3.5 3.5 0 0 0 3.5 3.5h17A3.5 3.5 0 0 0 24 20V10ZM3.5 21.5A1.5 1.5 0 0 1 2 20V3a.5.5 0 0 1 .5-.5h14a.5.5 0 0 1 .5.5v17c0 .295.037.588.11.874a.5.5 0 0 1-.484.625L3.5 21.5ZM22 20a1.5 1.5 0 1 1-3 0V9.5a.5.5 0 0 1 .5-.5H21a1 1 0 0 1 1 1v10Z" }),
                      /* @__PURE__ */ jsx("path", { d: "M12.751 6.047h2a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75h-2A.75.75 0 0 1 12 7.3v-.5a.75.75 0 0 1 .751-.753ZM12.751 10.047h2a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75h-2A.75.75 0 0 1 12 11.3v-.5a.75.75 0 0 1 .751-.753ZM4.751 14.047h10a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75h-10A.75.75 0 0 1 4 15.3v-.5a.75.75 0 0 1 .751-.753ZM4.75 18.047h7.5a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75h-7.5A.75.75 0 0 1 4 19.3v-.5a.75.75 0 0 1 .75-.753Z" })
                    ] })
                  }
                ) }),
                /* @__PURE__ */ jsxs("div", { className: "pt-3 sm:pt-5", children: [
                  /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-black dark:text-white", children: "Laravel News" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm/relaxed", children: "Laravel News is a community driven portal and newsletter aggregating all of the latest and most important news in the Laravel ecosystem, including new package releases and tutorials." })
                ] }),
                /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "size-6 shrink-0 self-center stroke-[#FF2D20]",
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    strokeWidth: "1.5",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                      }
                    )
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800", children: [
            /* @__PURE__ */ jsx("div", { className: "flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16", children: /* @__PURE__ */ jsx(
              "svg",
              {
                className: "size-5 sm:size-6",
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx("g", { fill: "#FF2D20", children: /* @__PURE__ */ jsx("path", { d: "M16.597 12.635a.247.247 0 0 0-.08-.237 2.234 2.234 0 0 1-.769-1.68c.001-.195.03-.39.084-.578a.25.25 0 0 0-.09-.267 8.8 8.8 0 0 0-4.826-1.66.25.25 0 0 0-.268.181 2.5 2.5 0 0 1-2.4 1.824.045.045 0 0 0-.045.037 12.255 12.255 0 0 0-.093 3.86.251.251 0 0 0 .208.214c2.22.366 4.367 1.08 6.362 2.118a.252.252 0 0 0 .32-.079 10.09 10.09 0 0 0 1.597-3.733ZM13.616 17.968a.25.25 0 0 0-.063-.407A19.697 19.697 0 0 0 8.91 15.98a.25.25 0 0 0-.287.325c.151.455.334.898.548 1.328.437.827.981 1.594 1.619 2.28a.249.249 0 0 0 .32.044 29.13 29.13 0 0 0 2.506-1.99ZM6.303 14.105a.25.25 0 0 0 .265-.274 13.048 13.048 0 0 1 .205-4.045.062.062 0 0 0-.022-.07 2.5 2.5 0 0 1-.777-.982.25.25 0 0 0-.271-.149 11 11 0 0 0-5.6 2.815.255.255 0 0 0-.075.163c-.008.135-.02.27-.02.406.002.8.084 1.598.246 2.381a.25.25 0 0 0 .303.193 19.924 19.924 0 0 1 5.746-.438ZM9.228 20.914a.25.25 0 0 0 .1-.393 11.53 11.53 0 0 1-1.5-2.22 12.238 12.238 0 0 1-.91-2.465.248.248 0 0 0-.22-.187 18.876 18.876 0 0 0-5.69.33.249.249 0 0 0-.179.336c.838 2.142 2.272 4 4.132 5.353a.254.254 0 0 0 .15.048c1.41-.01 2.807-.282 4.117-.802ZM18.93 12.957l-.005-.008a.25.25 0 0 0-.268-.082 2.21 2.21 0 0 1-.41.081.25.25 0 0 0-.217.2c-.582 2.66-2.127 5.35-5.75 7.843a.248.248 0 0 0-.09.299.25.25 0 0 0 .065.091 28.703 28.703 0 0 0 2.662 2.12.246.246 0 0 0 .209.037c2.579-.701 4.85-2.242 6.456-4.378a.25.25 0 0 0 .048-.189 13.51 13.51 0 0 0-2.7-6.014ZM5.702 7.058a.254.254 0 0 0 .2-.165A2.488 2.488 0 0 1 7.98 5.245a.093.093 0 0 0 .078-.062 19.734 19.734 0 0 1 3.055-4.74.25.25 0 0 0-.21-.41 12.009 12.009 0 0 0-10.4 8.558.25.25 0 0 0 .373.281 12.912 12.912 0 0 1 4.826-1.814ZM10.773 22.052a.25.25 0 0 0-.28-.046c-.758.356-1.55.635-2.365.833a.25.25 0 0 0-.022.48c1.252.43 2.568.65 3.893.65.1 0 .2 0 .3-.008a.25.25 0 0 0 .147-.444c-.526-.424-1.1-.917-1.673-1.465ZM18.744 8.436a.249.249 0 0 0 .15.228 2.246 2.246 0 0 1 1.352 2.054c0 .337-.08.67-.23.972a.25.25 0 0 0 .042.28l.007.009a15.016 15.016 0 0 1 2.52 4.6.25.25 0 0 0 .37.132.25.25 0 0 0 .096-.114c.623-1.464.944-3.039.945-4.63a12.005 12.005 0 0 0-5.78-10.258.25.25 0 0 0-.373.274c.547 2.109.85 4.274.901 6.453ZM9.61 5.38a.25.25 0 0 0 .08.31c.34.24.616.561.8.935a.25.25 0 0 0 .3.127.631.631 0 0 1 .206-.034c2.054.078 4.036.772 5.69 1.991a.251.251 0 0 0 .267.024c.046-.024.093-.047.141-.067a.25.25 0 0 0 .151-.23A29.98 29.98 0 0 0 15.957.764a.25.25 0 0 0-.16-.164 11.924 11.924 0 0 0-2.21-.518.252.252 0 0 0-.215.076A22.456 22.456 0 0 0 9.61 5.38Z" }) })
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "pt-3 sm:pt-5", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-black dark:text-white", children: "Vibrant Ecosystem" }),
              /* @__PURE__ */ jsxs("p", { className: "mt-4 text-sm/relaxed", children: [
                "Laravel's robust library of first-party tools and libraries, such as",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://forge.laravel.com",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white dark:focus-visible:ring-[#FF2D20]",
                    children: "Forge"
                  }
                ),
                ",",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://vapor.laravel.com",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Vapor"
                  }
                ),
                ",",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://nova.laravel.com",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Nova"
                  }
                ),
                ",",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://envoyer.io",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Envoyer"
                  }
                ),
                ", and",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://herd.laravel.com",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Herd"
                  }
                ),
                " ",
                "help you take your projects to the next level. Pair them with powerful open source libraries like",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://laravel.com/docs/billing",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Cashier"
                  }
                ),
                ",",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://laravel.com/docs/dusk",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Dusk"
                  }
                ),
                ",",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://laravel.com/docs/broadcasting",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Echo"
                  }
                ),
                ",",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://laravel.com/docs/horizon",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Horizon"
                  }
                ),
                ",",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://laravel.com/docs/sanctum",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Sanctum"
                  }
                ),
                ",",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://laravel.com/docs/telescope",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Telescope"
                  }
                ),
                ", and more."
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("footer", { className: "py-16 text-center text-sm text-black dark:text-white/70", children: [
          "Laravel v",
          laravelVersion,
          " (PHP v",
          phpVersion,
          ")"
        ] })
      ] }) })
    ] })
  ] });
}
const __vite_glob_0_29 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Welcome
}, Symbol.toStringTag, { value: "Module" }));
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var lib = {};
var hasRequiredLib;
function requireLib() {
  if (hasRequiredLib) return lib;
  hasRequiredLib = 1;
  Object.defineProperty(lib, "__esModule", {
    value: true
  });
  lib.default = void 0;
  var process = _interopRequireWildcard(require$$0);
  var _http = require$$1;
  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
    var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop2) {
      return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }
  function _interopRequireWildcard(obj, nodeInterop) {
    if (obj && obj.__esModule) {
      return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
      return { default: obj };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
      return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    newObj.default = obj;
    if (cache) {
      cache.set(obj, newObj);
    }
    return newObj;
  }
  const readableToString = (readable) => new Promise((resolve2, reject) => {
    let data = "";
    readable.on("data", (chunk) => data += chunk);
    readable.on("end", () => resolve2(data));
    readable.on("error", (err) => reject(err));
  });
  var _default = (render, port) => {
    const _port = port || 13714;
    const routes = {
      "/health": async () => ({
        status: "OK",
        timestamp: Date.now()
      }),
      "/shutdown": () => process.exit(),
      "/render": async (request) => render(JSON.parse(await readableToString(request))),
      "/404": async () => ({
        status: "NOT_FOUND",
        timestamp: Date.now()
      })
    };
    (0, _http.createServer)(async (request, response) => {
      const dispatchRoute = routes[request.url] || routes["/404"];
      try {
        response.writeHead(200, {
          "Content-Type": "application/json",
          "Server": "Inertia.js SSR"
        });
        response.write(JSON.stringify(await dispatchRoute(request)));
      } catch (e2) {
        console.error(e2);
      }
      response.end();
    }).listen(_port, () => console.log("Inertia SSR server started."));
    console.log(`Starting SSR server on port ${_port}...`);
  };
  lib.default = _default;
  return lib;
}
var libExports = requireLib();
const createServer = /* @__PURE__ */ getDefaultExportFromCjs(libExports);
function e() {
  return e = Object.assign ? Object.assign.bind() : function(t) {
    for (var r = 1; r < arguments.length; r++) {
      var e2 = arguments[r];
      for (var i2 in e2) ({}).hasOwnProperty.call(e2, i2) && (t[i2] = e2[i2]);
    }
    return t;
  }, e.apply(null, arguments);
}
class i {
  constructor(t, r, e2) {
    var i2, n2;
    this.name = t, this.definition = r, this.bindings = null != (i2 = r.bindings) ? i2 : {}, this.wheres = null != (n2 = r.wheres) ? n2 : {}, this.config = e2;
  }
  get template() {
    const t = `${this.origin}/${this.definition.uri}`.replace(/\/+$/, "");
    return "" === t ? "/" : t;
  }
  get origin() {
    return this.config.absolute ? this.definition.domain ? `${this.config.url.match(/^\w+:\/\//)[0]}${this.definition.domain}${this.config.port ? `:${this.config.port}` : ""}` : this.config.url : "";
  }
  get parameterSegments() {
    var t, r;
    return null != (t = null == (r = this.template.match(/{[^}?]+\??}/g)) ? void 0 : r.map((t2) => ({ name: t2.replace(/{|\??}/g, ""), required: !/\?}$/.test(t2) }))) ? t : [];
  }
  matchesUrl(r) {
    var e2;
    if (!this.definition.methods.includes("GET")) return false;
    const i2 = this.template.replace(/[.*+$()[\]]/g, "\\$&").replace(/(\/?){([^}?]*)(\??)}/g, (t, r2, e3, i3) => {
      var n3;
      const s3 = `(?<${e3}>${(null == (n3 = this.wheres[e3]) ? void 0 : n3.replace(/(^\^)|(\$$)/g, "")) || "[^/?]+"})`;
      return i3 ? `(${r2}${s3})?` : `${r2}${s3}`;
    }).replace(/^\w+:\/\//, ""), [n2, s2] = r.replace(/^\w+:\/\//, "").split("?"), o = null != (e2 = new RegExp(`^${i2}/?$`).exec(n2)) ? e2 : new RegExp(`^${i2}/?$`).exec(decodeURI(n2));
    if (o) {
      for (const t in o.groups) o.groups[t] = "string" == typeof o.groups[t] ? decodeURIComponent(o.groups[t]) : o.groups[t];
      return { params: o.groups, query: parse(s2) };
    }
    return false;
  }
  compile(t) {
    return this.parameterSegments.length ? this.template.replace(/{([^}?]+)(\??)}/g, (r, e2, i2) => {
      var n2, s2;
      if (!i2 && [null, void 0].includes(t[e2])) throw new Error(`Ziggy error: '${e2}' parameter is required for route '${this.name}'.`);
      if (this.wheres[e2] && !new RegExp(`^${i2 ? `(${this.wheres[e2]})?` : this.wheres[e2]}$`).test(null != (s2 = t[e2]) ? s2 : "")) throw new Error(`Ziggy error: '${e2}' parameter '${t[e2]}' does not match required format '${this.wheres[e2]}' for route '${this.name}'.`);
      return encodeURI(null != (n2 = t[e2]) ? n2 : "").replace(/%7C/g, "|").replace(/%25/g, "%").replace(/\$/g, "%24");
    }).replace(this.config.absolute ? /(\.[^/]+?)(\/\/)/ : /(^)(\/\/)/, "$1/").replace(/\/+$/, "") : this.template;
  }
}
class n extends String {
  constructor(t, r, n2 = true, s2) {
    if (super(), this.t = null != s2 ? s2 : "undefined" != typeof Ziggy ? Ziggy : null == globalThis ? void 0 : globalThis.Ziggy, this.t = e({}, this.t, { absolute: n2 }), t) {
      if (!this.t.routes[t]) throw new Error(`Ziggy error: route '${t}' is not in the route list.`);
      this.i = new i(t, this.t.routes[t], this.t), this.o = this.u(r);
    }
  }
  toString() {
    const t = Object.keys(this.o).filter((t2) => !this.i.parameterSegments.some(({ name: r }) => r === t2)).filter((t2) => "_query" !== t2).reduce((t2, r) => e({}, t2, { [r]: this.o[r] }), {});
    return this.i.compile(this.o) + stringify(e({}, t, this.o._query), { addQueryPrefix: true, arrayFormat: "indices", encodeValuesOnly: true, skipNulls: true, encoder: (t2, r) => "boolean" == typeof t2 ? Number(t2) : r(t2) });
  }
  h(t) {
    t ? this.t.absolute && t.startsWith("/") && (t = this.l().host + t) : t = this.m();
    let r = {};
    const [n2, s2] = Object.entries(this.t.routes).find(([e2, n3]) => r = new i(e2, n3, this.t).matchesUrl(t)) || [void 0, void 0];
    return e({ name: n2 }, r, { route: s2 });
  }
  m() {
    const { host: t, pathname: r, search: e2 } = this.l();
    return (this.t.absolute ? t + r : r.replace(this.t.url.replace(/^\w*:\/\/[^/]+/, ""), "").replace(/^\/+/, "/")) + e2;
  }
  current(t, r) {
    const { name: n2, params: s2, query: o, route: u } = this.h();
    if (!t) return n2;
    const h = new RegExp(`^${t.replace(/\./g, "\\.").replace(/\*/g, ".*")}$`).test(n2);
    if ([null, void 0].includes(r) || !h) return h;
    const a = new i(n2, u, this.t);
    r = this.u(r, a);
    const l = e({}, s2, o);
    if (Object.values(r).every((t2) => !t2) && !Object.values(l).some((t2) => void 0 !== t2)) return true;
    const c = (t2, r2) => Object.entries(t2).every(([t3, e2]) => Array.isArray(e2) && Array.isArray(r2[t3]) ? e2.every((e3) => r2[t3].includes(e3)) : "object" == typeof e2 && "object" == typeof r2[t3] && null !== e2 && null !== r2[t3] ? c(e2, r2[t3]) : r2[t3] == e2);
    return c(r, l);
  }
  l() {
    var t, r, e2, i2, n2, s2;
    const { host: o = "", pathname: u = "", search: h = "" } = "undefined" != typeof window ? window.location : {};
    return { host: null != (t = null == (r = this.t.location) ? void 0 : r.host) ? t : o, pathname: null != (e2 = null == (i2 = this.t.location) ? void 0 : i2.pathname) ? e2 : u, search: null != (n2 = null == (s2 = this.t.location) ? void 0 : s2.search) ? n2 : h };
  }
  get params() {
    const { params: t, query: r } = this.h();
    return e({}, t, r);
  }
  get routeParams() {
    return this.h().params;
  }
  get queryParams() {
    return this.h().query;
  }
  has(t) {
    return this.t.routes.hasOwnProperty(t);
  }
  u(t = {}, r = this.i) {
    null != t || (t = {}), t = ["string", "number"].includes(typeof t) ? [t] : t;
    const i2 = r.parameterSegments.filter(({ name: t2 }) => !this.t.defaults[t2]);
    return Array.isArray(t) ? t = t.reduce((t2, r2, n2) => e({}, t2, i2[n2] ? { [i2[n2].name]: r2 } : "object" == typeof r2 ? r2 : { [r2]: "" }), {}) : 1 !== i2.length || t[i2[0].name] || !t.hasOwnProperty(Object.values(r.bindings)[0]) && !t.hasOwnProperty("id") || (t = { [i2[0].name]: t }), e({}, this.$(r), this.p(t, r));
  }
  $(t) {
    return t.parameterSegments.filter(({ name: t2 }) => this.t.defaults[t2]).reduce((t2, { name: r }, i2) => e({}, t2, { [r]: this.t.defaults[r] }), {});
  }
  p(t, { bindings: r, parameterSegments: i2 }) {
    return Object.entries(t).reduce((t2, [n2, s2]) => {
      if (!s2 || "object" != typeof s2 || Array.isArray(s2) || !i2.some(({ name: t3 }) => t3 === n2)) return e({}, t2, { [n2]: s2 });
      if (!s2.hasOwnProperty(r[n2])) {
        if (!s2.hasOwnProperty("id")) throw new Error(`Ziggy error: object passed as '${n2}' parameter is missing route model binding key '${r[n2]}'.`);
        r[n2] = "id";
      }
      return e({}, t2, { [n2]: s2[r[n2]] });
    }, {});
  }
  valueOf() {
    return this.toString();
  }
}
function s(t, r, e2, i2) {
  const s2 = new n(t, r, e2, i2);
  return t ? s2.toString() : s2;
}
const resolve = (name) => {
  const pages = /* @__PURE__ */ Object.assign({ "./Pages/AboutUs.jsx": __vite_glob_0_0, "./Pages/Admin/Contents/Create.jsx": __vite_glob_0_1, "./Pages/Admin/Contents/Edit.jsx": __vite_glob_0_2, "./Pages/Admin/Contents/Index.jsx": __vite_glob_0_3, "./Pages/Admin/Contents/Partials/ContentForm.jsx": __vite_glob_0_4, "./Pages/Admin/Destinations/Edit.jsx": __vite_glob_0_5, "./Pages/Admin/Destinations/Index.jsx": __vite_glob_0_6, "./Pages/Admin/OptionalActivities/Create.jsx": __vite_glob_0_7, "./Pages/Admin/OptionalActivities/Edit.jsx": __vite_glob_0_8, "./Pages/Admin/OptionalActivities/Index.jsx": __vite_glob_0_9, "./Pages/Admin/OptionalActivities/Partials/OptionalActivityForm.jsx": __vite_glob_0_10, "./Pages/Admin/Settings/Seo.jsx": __vite_glob_0_11, "./Pages/Admin/Tours/Create.jsx": __vite_glob_0_12, "./Pages/Admin/Tours/Edit.jsx": __vite_glob_0_13, "./Pages/Admin/Tours/Index.jsx": __vite_glob_0_14, "./Pages/ContactUs.jsx": __vite_glob_0_15, "./Pages/ContentDetail.jsx": __vite_glob_0_16, "./Pages/Contents.jsx": __vite_glob_0_17, "./Pages/Dashboard.jsx": __vite_glob_0_18, "./Pages/DestinationDetail.jsx": __vite_glob_0_19, "./Pages/Destinations.jsx": __vite_glob_0_20, "./Pages/Home.jsx": __vite_glob_0_21, "./Pages/Pages/Tours.jsx": __vite_glob_0_22, "./Pages/Profile/Edit.jsx": __vite_glob_0_23, "./Pages/Profile/Partials/DeleteUserForm.jsx": __vite_glob_0_24, "./Pages/Profile/Partials/UpdatePasswordForm.jsx": __vite_glob_0_25, "./Pages/Profile/Partials/UpdateProfileInformationForm.jsx": __vite_glob_0_26, "./Pages/TourDetail.jsx": __vite_glob_0_27, "./Pages/Tours.jsx": __vite_glob_0_28, "./Pages/Welcome.jsx": __vite_glob_0_29 });
  let page = pages[`./Pages/${name}.jsx`];
  if (!page) {
    return null;
  }
  page.default.layout = page.default.layout || ((page2) => /* @__PURE__ */ jsx("div", { children: page2 }));
  return page;
};
createServer(
  (page) => createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve,
    setup: ({ App, props }) => {
      const { ziggy } = props.initialPage.props;
      props.initialPage.props.url = page.url;
      global.route = (name, params, absolute) => {
        try {
          const config = { ...ziggy || {} };
          if (config.location) {
            config.location = new URL(config.location);
          }
          if (!config.routes || !config.routes[name]) {
            if (false) ;
            return "#";
          }
          return s(name, params, absolute, config);
        } catch (e2) {
          return "#";
        }
      };
      return /* @__PURE__ */ jsx(ThemeProvider, { children: /* @__PURE__ */ jsx(App, { ...props }) });
    }
  })
);
