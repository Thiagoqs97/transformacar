const fs = require('fs');
let c = fs.readFileSync('src/App.tsx', 'utf8');

// Global Wrapper
c = c.replace('bg-[#021631] text-white', 'bg-white text-[#021631]');

// Header
c = c.replace('bg-[#010e20]/80 backdrop-blur-md border-b border-white/10', 'bg-white/90 backdrop-blur-md border-b border-[#021631]/10');
c = c.replace('text-gray-300 tracking-wide', 'text-[#021631]/80 tracking-wide');
c = c.replace('text-white hover:text-[#fcbc17]', 'text-[#021631] hover:text-[#fcbc17]');

// Hero
c = c.replace('from-[#010e20]/90 via-[#010e20]/70 to-[#010e20]/40', 'from-white/90 via-white/70 to-white/40');
c = c.replace('<span className="text-white">Famosa do Brasil</span>', '<span className="text-[#021631]">Famosa do Brasil</span>');
c = c.replace('text-gray-300 mb-10', 'text-[#021631]/80 mb-10');
c = c.replace('border-white text-white hover:bg-white hover:text-[#010e20]', 'border-[#021631] text-[#021631] hover:bg-[#021631] hover:text-white');
c = c.replace('border-white/30 text-white hover:border-white', 'border-[#021631]/30 text-[#021631] hover:border-[#021631]');

// Stats Bar
c = c.replace(/text-\[#010e20\]/g, 'text-[#021631]');
c = c.replace(/divide-\[#010e20\]\/10/g, 'divide-[#021631]/10');

// Featured Vehicle
c = c.replace('py-24 bg-[#021631]', 'py-24 bg-white');
c = c.replace('text-gray-400 mt-4', 'text-[#021631]/70 mt-4');
c = c.replace('bg-[#032046] rounded-sm', 'bg-gray-100 rounded-sm');
c = c.replace('text-[#010e20] fill-[#010e20]', 'text-white fill-white'); // Play button icon
c = c.replace('text-gray-400 leading-relaxed', 'text-[#021631]/70 leading-relaxed');
c = c.replace('border-white/10', 'border-[#021631]/10');
c = c.replace(/text-white mb-1/g, 'text-[#021631] mb-1');
c = c.replace('border-white/30 text-white hover:border-white', 'border-[#021631]/30 text-[#021631] hover:border-[#021631]');

// Carousel Section
c = c.replace('py-24 bg-[#010e20]', 'py-24 bg-gray-50');
c = c.replace('border-white/20', 'border-[#021631]/20');
c = c.replace('border-white/20', 'border-[#021631]/20'); // two buttons
c = c.replace(/bg-\[#021631\] border border-white\/5/g, 'bg-white border border-[#021631]/10 shadow-sm');
c = c.replace(/bg-\[#010e20\]\/80 text-\[#fcbc17\]/g, 'bg-white/90 text-[#fcbc17]');
c = c.replace(/bg-\[#010e20\]\/80 text-white/g, 'bg-[#021631] text-white');
c = c.replace(/text-gray-400 mb-1/g, 'text-[#021631]/60 mb-1');
c = c.replace(/text-gray-400 hover:text-white/g, 'text-[#021631]/60 hover:text-[#021631]');
c = c.replace('hover:text-white transition-colors font-bold uppercase tracking-widest text-sm border-b border-[#fcbc17]', 'hover:text-[#021631] transition-colors font-bold uppercase tracking-widest text-sm border-b border-[#fcbc17]');

// Benefits
c = c.replace('py-16 bg-[#021631] border-y border-white/5', 'py-16 bg-white border-y border-[#021631]/10');
c = c.replace(/bg-\[#032046\] p-8/g, 'bg-gray-50 p-8');
c = c.replace(/hover:bg-\[#151515\]/g, 'hover:bg-gray-100');
c = c.replace(/text-sm text-gray-400/g, 'text-sm text-[#021631]/70');

// Testimonials
c = c.replace('py-24 bg-[#010e20]', 'py-24 bg-gray-50');
c = c.replace('text-gray-400 text-sm', 'text-[#021631]/70 text-sm');
c = c.replace(/bg-\[#021631\] p-8 border border-white\/5/g, 'bg-white p-8 border border-[#021631]/10 shadow-sm');
c = c.replace(/text-gray-300 mb-8/g, 'text-[#021631]/80 mb-8');
c = c.replace(/font-bold text-white/g, 'font-bold text-[#021631]');
c = c.replace('border-gray-600 hover:border-white', 'border-[#021631]/30 hover:border-[#021631]');

// Map & Location
c = c.replace('py-24 bg-[#021631]', 'py-24 bg-white');
c = c.replace('text-gray-400 text-lg', 'text-[#021631]/70 text-lg');
c = c.replace(/bg-\[#032046\] flex/g, 'bg-gray-50 flex');
c = c.replace(/text-gray-400/g, 'text-[#021631]/70');
c = c.replace('bg-[#032046] rounded-sm relative', 'bg-gray-100 rounded-sm relative');
c = c.replace('border-white/5', 'border-[#021631]/10');
c = c.replace('bg-[#010e20]/80 backdrop-blur-sm', 'bg-white/90 backdrop-blur-sm');

// Floating Action Button
c = c.replace('text-[#010e20] text-xs', 'text-[#021631] text-xs');

// Footer
c = c.replace('bg-[#010e20] pt-20 pb-8 border-t border-white/5', 'bg-gray-50 pt-20 pb-8 border-t border-[#021631]/10');
c = c.replace(/text-white font-bold mb-6/g, 'text-[#021631] font-bold mb-6');
c = c.replace(/bg-white\/5/g, 'bg-[#021631]/5');
c = c.replace(/hover:bg-white\/10/g, 'hover:bg-[#021631]/10');
c = c.replace(/group-hover:text-white/g, 'group-hover:text-[#021631]');
c = c.replace(/text-white group-hover:text-\[#010e20\]/g, 'text-[#021631] group-hover:text-white');
c = c.replace(/bg-\[#010e20\] flex/g, 'bg-white flex');
c = c.replace(/group-hover:bg-\[#fcbc17\]/g, 'group-hover:bg-[#fcbc17]');
c = c.replace(/text-white text-sm font-bold/g, 'text-[#021631] text-sm font-bold');
c = c.replace('border-white/10 flex', 'border-[#021631]/10 flex');
c = c.replace('text-gray-500 font-medium', 'text-[#021631]/60 font-medium');

fs.writeFileSync('src/App.tsx', c);
console.log('done');
