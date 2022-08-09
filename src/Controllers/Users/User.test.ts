import { describe, it, beforeEach } from "mocha";
import { expect } from "chai";
import { readUser, createUser, updateUser, deleteUser } from './User';
import { Connection } from '../../Model/conn';

Connection().then(() => {
    console.log("Connection")
})
.catch((err) => {
    console.error(err)
})



describe('User controler test', function () {
    let newUserId = 0;
    it('Should return array of user not empty', async () => {
        const result = await readUser("*");
        expect(result).to.have.lengthOf(1);
    })
    it('Should add User data', async () => {
        const result = await createUser({
            firstname: 'Jane',
            lastname: 'doe',
            email_address: 'example@email.com',
            postal_address: '1 bis example road',
            city: 'Ecity',
            country: 'Ec'
        }, 1)
        expect(result).to.haveOwnProperty('status').eq(200);
        newUserId = result?.data.newUserId;
    })
    it('Should update new user added', async () => {
        const result = await updateUser({firstname: 'Jean'}, newUserId)
        expect(result).to.haveOwnProperty('status').eq(200);
    })

    it('Should return array of token not empty', async () => {
        const result = await readUser('firstname,lastname', 'firstname:john,lastname:doe');
        expect(result).to.have.lengthOf(1);
    })

    it('Should delete New User created', async () => {
        const result = await deleteUser(newUserId);
        expect(result).to.haveOwnProperty('status').eq(200);

    })
})