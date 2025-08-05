import rateLimit from "express-rate-limit";

const loginLimiter = rateLimit({
    windowsMs: 15 * 60 * 1000,// 15min
    limit:100, // max 100 requetes par ip sur 15 min
    standardHeaders: 'draft-8',
    legacyHeaders:false,
    message : 'Trop de demandes, veuillez réessayer plus tard'
    
})

export default loginLimiter;