import Image from 'next/image'

export function HeroDoctor() {
  return (
    <div className="hidden lg:flex absolute left-[62%] -translate-x-1/2 bottom-0 w-[55vw] max-w-[750px] h-[92vh] z-[15] pointer-events-none flex-col justify-end">
      <Image 
        src="/hero-doctor.png" 
        alt="Professional Doctor" 
        fill 
        className="object-contain object-bottom drop-shadow-[0_45px_100px_rgba(0,0,0,0.12)]" 
        priority 
      />
    </div>
  )
}
