import { EntityManager } from "typeorm";
import { credentialRepository } from "../config/data-source";
import { Credential } from "../entities/Credential";
import bcrypt from "bcryptjs";

export const createCredentialService = async (entityManager: EntityManager, username: string, password: string): Promise<Credential> => {
    const hassPassword = await bcrypt.hash(password, 10);

    console.log(hassPassword);
    
    const newCredential: Credential = entityManager.create(Credential, { username, password: hassPassword });
    
    const result = await entityManager.save(Credential, newCredential);
    return result;
};

export const validateCredentialService = async (username: string, password: string): Promise<number> => {
    const foundCredential: null | Credential = await credentialRepository.findOne({where: {username}});
    if (!foundCredential) throw new Error ("El username no existe");
    const isValid = await bcrypt.compare(password, foundCredential.password);
    if (!isValid) throw new Error ("Contraseña Incorrecta");
    return foundCredential.id;
};
