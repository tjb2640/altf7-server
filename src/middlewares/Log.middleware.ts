import { Request, Response, NextFunction } from 'express'
import { getRemoteAddress } from '../utils/Endpoint.utils'

// TODO: buffer logs then occasionally (and on shutdown) dump to a logfile

/**
 * Middleware for logging access attempts.
 * @param options 
 * @returns 
 */
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    const remoteAddress = getRemoteAddress(req) // for reverse proxy compatibility
    // TODO instead of just writing to stdout, buffer and dump to file
    if (process.env.NODE_ENV !== 'test') {
        console.log(` ? ${remoteAddress} @ ${new Date()} - ${req.method}:${req.url}`)
    }
    next()
}

export default requestLogger