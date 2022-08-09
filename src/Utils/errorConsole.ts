export const errorConsole = (err: any)=>{
    console.group()
    console.trace("Error")
    console.error(err)
    console.groupEnd()
}