import { makeServer } from "../../../../server"
const request = require('supertest')


const BASEPATH = '/apiv1/util'

// level -> xp
const BASE_TRUTH = {
    0: 0,
    1: 5,
    2: 15,
    3: 30,
    100: 25250,
    632: 1000140,
    2000: 10005000,
}

describe('Util.controller.ts', () => {
    const server = makeServer()

    it('Should return the correct XP at any given level', async () => {
        for (const [lvl, xp] of Object.entries(BASE_TRUTH)) {
            const response = await request(server).get(`${BASEPATH}/xp/${lvl}`).expect(200)
            expect(response.body['xp']).toBe(xp)
        }
    })

    it('Should return the correct level at any given XP', async () => {
        for (const [lvl, xp] of Object.entries(BASE_TRUTH)) {
            const response = await request(server).get(`${BASEPATH}/level/${xp}`).expect(200)
            expect(Math.floor(parseInt(response.body['level'], 10))).toBe(parseInt(lvl, 10))
        }
    })
    
})