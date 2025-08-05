import { error } from "console";
import companyDatamapper from "../../app/datamapper/company.datamapper.js";
import getCompany from "./companyCall.js";
import fs from "fs";
import { ifError } from "assert";
//import cacheCompany from "./stockageCompaniecall.js";



// Fonction pour mettre à jour le cache
async function DownloadCompanyCache() {

  // lecture du fichier js temporaire contenant les entrprise via l'api 

  fs.readFile("./utils/data.json", "utf-8", async (error,jsonString)=>{
    if(error){
        console.log("erreur dans la lecture du fichier", err);
        return;
    }
    try {

      const companies = JSON.parse(jsonString);
      
       // TRAITEMENT DES SECTEURS
       const seenSectors = new Set();

       for(let company of companies){
        const sector = company.sector;

        seenSectors.add(sector)
       }
       const secteurs = Array.from(seenSectors)
       //console.log(secteurs);

       //si les secteurs existe deja dans la table
       for(let sector of secteurs){
            const exsitingSectors = await companyDatamapper.existSector(sector);

            if (!exsitingSectors) {
                const sectorsToBdd = await companyDatamapper.pushSectorsOnBdd(sector);
                return sectorsToBdd;
            }else{
                console.log(`le secteur ${sector} existe deja en base de données`);
            }
       }

       //TRAITEMENT DES COMPANIES

       //si l'entreprise  existe deja dans la table
    

       const result = [];
        const seenCompanies = new Set();
        const uniqueCompanies = [];

        // 1. Filtrer les doublons par symbol
        for (let company of companies) {
        if (!seenCompanies.has(company.symbol)) {
            seenCompanies.add(company.symbol);
            uniqueCompanies.push(company);
        }
        }

        // 2. Insérer si l'entreprise n'existe pas déjà en base
        for (let company of uniqueCompanies) {
        const existingCompany = await companyDatamapper.existCompany(company.symbol);

        if (!existingCompany) {
            const companiesObject = {
            symbol: company.symbol,
            nom_company: company.companyName,
            description: company.description,
            date_creation: company.ipoDate,
            marketcap: company.marketCap,
            lastdividend: company.lastDividend,
            averagevolume: Math.floor(Number(company.averageVolume)),
            currency: company.currency,
            exchangefullname: company.exchangeFullName,
            exchange: company.exchange,
            industry: company.industry,
            website: company.website,
            ceo: company.ceo,
            country: company.country,
            fulltimeemployees: company.fullTimeEmployees,
            address: company.address,
            phone: company.phone,
            image: company.image,
            ipodate: company.ipoDate,
            };

           
            
            const companiesToBDD = await companyDatamapper.pushCompanyOnBDD(companiesObject);
            result.push(companiesToBDD);
        } else {
            console.log(`L'entreprise ${company.symbol} existe déjà en base de données.`);
            console.log(company.marketcap);
            
        }
        }

        return result;

        
    } catch (error) {
        console.log("error lors du parsing JSON", error);
        
    }
    
  })

 

}



export default DownloadCompanyCache;
