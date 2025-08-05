import userDatamapper from "../datamapper/user.datamapper.js"

const Useraddfavotite = {

    addfavorites : async (req,res)=>{
        const idcompany = parseInt(req.params.idcompany)
        const userId = req.user.userId
        
        const favorisExist = await userDatamapper.findFavoritesByid(userId,idcompany);

       const isAlreadyFavori = favorisExist.length > 0;

        if (!isAlreadyFavori) {
        const addFavoris = await userDatamapper.addfavorites(userId, idcompany);
        return res.status(200).json({ message: 'Favori ajouté'});
        }

        return res.status(409).json({ message: 'Déjà dans les favoris' });

                
        }
}

export default Useraddfavotite