import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'filter'
})

export class FilterPipe implements PipeTransform {
    transform(items: Array<any>, searchText: string){
        if(searchText === undefined) return items;

        let searchResult = items.filter((item)=>{
            return item.title.toLowerCase().includes(searchText.toLowerCase());
        })
            // console.log(searchResult);
        if(searchResult.length < 1){
            searchResult.push({title: 'Nothing to show here!'})
            return searchResult;
        }else{
            return searchResult;
        }

    }
}