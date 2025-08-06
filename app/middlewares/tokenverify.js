import jwt from 'jsonwebtoken';

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  // Cas : Aucun token fourni
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Vous devez être connecté pour accéder à cette ressource." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_WORD);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Votre session a expiré ou le token est invalide. Veuillez vous reconnecter." });
  }
}

export default authenticateJWT;
