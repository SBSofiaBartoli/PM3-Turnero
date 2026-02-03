import { AppDataSource, userRepository } from "../config/data-source";
import { IResponseUserDto } from "../dto/IResponseUserDto";
import type { IUserDto } from "../dto/UserDto";
import { Credential } from "../entities/Credential";
import { User } from "../entities/User";
import { createCredentialService, validateCredentialService } from "./credentialService";

export const getAllUsersService = async (): Promise<User[]> => {
    const users = await userRepository.find();
    return users;
};

export const getUserByIdService = async (id: number): Promise<User | null> => {
    const user = await userRepository.findOne({ where: { id }, relations: { appointments: true } });
    if (!user) throw new Error ("Usuario no encontrado");
    return user;
};

export const createUserService = async (userData: IUserDto): Promise<IResponseUserDto> => {
    const resultUser = await AppDataSource.transaction(async (entityManager) =>{

    const existingUser = await entityManager.findOne(User, {
        where: [
        { email: userData.email },
        { credential: { username: userData.username } },
        ],
        relations: ["credential"],
    });
    if (existingUser) {
        throw new Error("Ya existe un usuario con ese email o nombre de usuario");
    }

    const newCredential: Credential = await createCredentialService(entityManager, userData.username, userData.password);

    const newUser: User = entityManager.create(User, {
        name: userData.name,
        email: userData.email,
        birthdate: userData.birthdate,
        nDni: userData.nDni,
        credential: newCredential,
    });

    const results = await entityManager.save(User, newUser);
    return results;
    });

    return {
        id: resultUser.id,
        name: resultUser.name,
        email: resultUser.email,
        birthdate: resultUser.birthdate,
        nDni: resultUser.nDni
    };
};

export const loginUserService = async (username: string, password: string): Promise<User> => {
    const credentialId = await validateCredentialService(username, password);
    const foundUser: User | null = await userRepository.findOne({where: {credential: {id: credentialId}}});
    if (!foundUser) throw new Error ("Usuario no encontrado");
    return foundUser;
};
