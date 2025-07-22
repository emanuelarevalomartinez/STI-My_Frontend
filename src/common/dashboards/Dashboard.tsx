
interface Props{
    children:React.ReactNode;
  }
  
  
  export function DashBoard({children}:Props){
    
      return(
          <>
            <div className="fixed w-full z-40 flex top-0 h-16 bg-[#014171] items-center justify-between px-8 py-6 text-white">
              {children}
            </div>
          </>
      )
  }