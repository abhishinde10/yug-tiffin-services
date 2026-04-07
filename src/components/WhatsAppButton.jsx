import { useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const location = useLocation();

  // ONLY show on homepage ("/")
  if (location.pathname !== '/') {
    return null;
  }

  return (
    <a
      href="https://wa.me/918888165662"
      target="_blank"
      rel="noopener noreferrer"
      className="chat-whatsapp"
    >
      <MessageCircle size={22} />
      <span>Chat on WhatsApp</span>
    </a>
  );
};

export default WhatsAppButton;
