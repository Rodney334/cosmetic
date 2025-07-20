import { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4">
      <p>© {new Date().getFullYear()} Tous droits réservés.</p>
    </footer>
  );
};

export default Footer;
