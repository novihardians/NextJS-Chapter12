import '@/app/ui/global.css'; // adding materi 2
import { inter } from '@/app/ui/fonts'; // adding materi 3
 
export default function RootLayout({ 
  children, 
}: { 
  children: React.ReactNode; 
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body> 
      {/* adding materi 3 // antialiased: class name for font smooting */}
    </html>
  );
}