import jwt from 'jsonwebtoken';

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token manquant ou invalide." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_WORD);
    req.user = decoded; // On ajoute les infos du token à la requête
    next();
  } catch (err) {
    return res.status(403).json({ error: "Token invalide ou expiré." });
  }
}

export default authenticateJWT;