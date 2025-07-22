

interface Props{
    children: React.ReactNode
}

export function ErrorAuthMessage({children}:Props){
    return(
        <>
        <p className="flex text-center w-full justify-center rounded-xl py-0 sm:py-1.5 text-red-600 bg-white">
          {children}
        </p>
        </>
    )
}