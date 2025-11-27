
export const getCategoriesList = (repartition: Array<any>) => { 
    return repartition.map((rep) => {return {name: rep.name, value: rep.totalExpenses }});
}
