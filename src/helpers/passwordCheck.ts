import bcrypt from 'bcrypt'


export async function passwordCompare(password:string,Incoming:string){
   const result = await bcrypt.compare(Incoming,password)
}

export async function passwordHash(incoming:string){
    return await bcrypt.hash(incoming,10);
}