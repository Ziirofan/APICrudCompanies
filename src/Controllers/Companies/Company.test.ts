import { describe, it, beforeEach } from "mocha";
import { expect } from "chai";
import { readCompany, createCompany, updateCompany, deleteCompany} from './Company'
import { Connection } from '../../Model/conn';

Connection().then(() => {
    console.log("Connection")
})
.catch((err) => {
    console.error(err)
})



describe('Companies controler test', function () {
    let newCompId = 0;
    it('Should return array of companies not empty', async () => {
        const result = await readCompany("*");
        expect(result).to.have.lengthOf(1);
    })
    it('Should add Company data', async () => {
        const result = await createCompany({
            name: 'ECompany',
            siret: 98728326382,
            city: 'Ecity',
            country: 'Ec'
        })
        expect(result).to.haveOwnProperty('status').eq(200);
        newCompId = result?.data.newCompanyId;
    })
    it('Should update new company added', async () => {
        const result = await updateCompany({name: 'Icompany'}, newCompId)
        expect(result).to.haveOwnProperty('status').eq(200);
    })

    it('Should return array of companies not empty', async () => {
        const result = await readCompany('name,siret', 'name:ICompany,siret:98728326382');
        expect(result).to.have.lengthOf(1);
    })

    it('Should delete New company created', async () => {
        const result = await deleteCompany(newCompId);
        expect(result).to.haveOwnProperty('status').eq(200);
    })
})