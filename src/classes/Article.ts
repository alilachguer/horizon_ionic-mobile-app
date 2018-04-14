export class Article{
    constructor(public title : string ="",
                public image : string = "",
                public description : string ="",
                public link : string ="",         
                public date : string = "",
                public nbLikes : any =0,
                public nbInLikes : any =0,
                public nbShares : any =0,
                public score : any = 0,                
            )
                {}
}