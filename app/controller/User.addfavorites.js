import userDatamapper from "../datamapper/user.datamapper.js"

const Useraddfavotite = {

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

    },

    watchlist : async (req,res)=>{
        try {
            const userId = parseInt(req.user.userId);
            const favorites = await userDatamapper.watchlist(userId);
            if (!favorites || favorites.length === 0) {
                return res.status(404).json({ message: 'Aucun favori trouvé pour cet utilisateur.' })
            }
            return res.status(200).json(favorites);

        } catch (error) {
            console.error('Erreur lors de la récupération des favoris :', error);
            return res.status(500).json({ message: 'Erreur serveur lors de la récupération des favoris.' });
        }

    }
}

export default Useraddfavotite