const WhatsAppButton = ({ phone }) => {
  const link = `https://wa.me/${phone.replace("+", "")}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Envoyer un message WhatsApp
    </a>
  );
};

export default WhatsAppButton;
