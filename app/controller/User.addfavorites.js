import userDatamapper from "../datamapper/user.datamapper.js"

const Useraddfavotite = {

    addfavorites : async (req,res)=>{
        const idcompany = parseInt(req.params.idcompany);
        const userId = parseInt(req.user.userId);
        
        const favorisExist = await userDatamapper.findFavoritesByid(userId,idcompany);

        const isAlreadyFavori = favorisExist.length > 0;

        if (!isAlreadyFavori) {
        const addFavoris = await userDatamapper.addfavorites(userId, idcompany);
        return res.status(200).json({ message: 'Favori ajouté'});
        }

        return res.status(409).json({ message: 'Déjà dans les favoris' });

                
    },
    
    toggleFavorite : async (req,res)=>{
        
        const companyId = parseInt(req.params.idcompany, 10);
        const userId = parseInt(req.user.userId, 10);

        try {
            const favorites = await userDatamapper.findFavoritesByid(userId, companyId);
            const isAlreadyFavorite = favorites.length > 0;

            if (!isAlreadyFavorite) {
                await userDatamapper.addfavorites(userId, companyId);
                return res.status(200).json({ message: 'Favori ajouté' });
            }

            await userDatamapper.dropfavorites(companyId, userId);
            return res.status(200).json({ message: 'Favori retiré' });
        } catch (error) {
            console.error('Erreur lors du toggle de favori :', error);
            return res.status(500).json({ message: 'Une erreur est survenue' });
        }

    }
}

export default Useraddfavotite