import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock, MessageCircle, Instagram, Facebook, Linkedin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Dirección',
    details: ['', 'Godoy Cruz, Mendoza', 'Argentina'],
  },
  {
    icon: Phone,
    title: 'Teléfono',
    details: ['+54 9 261 264 6209']
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['biotech-sistemas@proton.me'],
  },
  {
    icon: Clock,
    title: 'Horario de Atención',
    details: ['Lun-Vie: 9:00 - 18:00'],
  },
];

const socialLinks = [
  { 
    icon: MessageCircle, 
    label: 'WhatsApp', 
    href: 'https://wa.me/5492612646209',
    // Degradado de verde lima a verde esmeralda
    colorClasses: 'bg-gradient-to-tr from-[#25D366] to-[#128C7E] hover:brightness-90 text-white border-transparent'
  },
  { 
    icon: Instagram, 
    label: 'Instagram', 
    href: 'https://www.instagram.com/biotech_sistemas23',
    // Degradado oficial de Instagram
    colorClasses: 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:brightness-90 text-white border-transparent'
  },
];

export function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construir el texto del mensaje para WhatsApp
    const text = `*Consulta desde la web*\n\n` +
                 `*Nombre:* ${formData.name}\n` +
                 `*Email:* ${formData.email}\n` +
                 `${formData.phone ? `*Teléfono:* ${formData.phone}\n` : ''}` +
                 `*Asunto:* ${formData.subject}\n\n` +
                 `*Mensaje:*\n${formData.message}`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/5492612646209?text=${encodedText}`;

    // Abrir WhatsApp (en móvil abre la app, en desktop abre web.whatsapp.com)
    window.open(whatsappUrl, '_blank');

    // Notificación opcional
    toast({
      title: 'Abriendo WhatsApp',
      description: 'Serás redirigido para enviar tu mensaje.',
    });

    // Limpiar el formulario
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contacto" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-medium mb-3 md:mb-4">
            <MessageCircle className="w-3 h-3 md:w-4 md:h-4" />
            <span>Contáctanos</span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-3 md:mb-4">
            ¿Cómo Podemos Ayudarte?
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
            Completa el formulario y te redirigiremos directamente a WhatsApp para enviar tu consulta.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Info */}
          <div className="space-y-6 md:space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 items-stretch">
              {contactInfo.map((item, index) => (
                <div
                  key={item.title}
                  className="service-card animate-fade-in p-4 md:p-6 w-full max-w-[280px] md:max-w-none text-center md:text-left h-full flex flex-col items-center justify-center"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl gradient-primary flex items-center justify-center mb-3 md:mb-4">
                    <item.icon className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
                  </div>
                  <h4 className="font-bold text-foreground mb-2 text-sm md:text-base">{item.title}</h4>
                  {item.details.map((detail, i) => (
                    <p key={i} className="text-xs md:text-sm text-muted-foreground">
                      {detail}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="p-4 md:p-6 rounded-2xl bg-muted/50 border border-border/50">
              <h4 className="font-bold text-foreground mb-3 md:mb-4 text-sm md:text-base">Síguenos en Redes</h4>
              <div className="flex gap-3 md:gap-4 justify-center sm:justify-start">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all duration-300 shadow-md ${social.colorClasses}`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4 md:w-5 md:h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-3xl p-6 md:p-8 border border-border/50 shadow-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6">Envíanos un Mensaje por WhatsApp</h3>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Nombre Completo *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Tu nombre completo"
                    required
                    className="text-base"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    required
                    className="text-base"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Teléfono
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+54 11 1234-5678"
                    className="text-base"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Asunto *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="¿En qué podemos ayudarte?"
                    required
                    className="text-base"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Mensaje *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Escribe tu mensaje aquí..."
                  rows={4}
                  required
                  className="text-base resize-none"
                />
              </div>
              <Button
                type="submit"
                variant="default"
                size="lg"
                className="w-full text-base py-3"
                aria-describedby="whatsapp-description"
              >
                <MessageCircle className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Enviar por WhatsApp
              </Button>
              <p id="whatsapp-description" className="sr-only">
                Al enviar este formulario, serás redirigido a WhatsApp con tu mensaje pre-llenado
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}