let videoDataUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json';

let videoData
let videoTiles
let block

let canvas = d3.select('#canvas');
let tooltip = d3.select('#tooltip');

let drawTreeMap=()=>{
   let hierarchy = d3.hierarchy(videoData, (node)=>{
    return node['children']
   }).sum((node)=>{
    return +node['value']
   }).sort((node1, node2)=>{
    return node2['value'] - node1['value']
   })

   
   let createTreeMap = d3.treemap()
                         .size([1000, 600])

    createTreeMap(hierarchy);  
    videoTiles =  hierarchy.leaves() 
    console.log(videoTiles);
    
    block = canvas.selectAll('g')
                      .data(videoTiles) 
                      .enter()
                      .append('g')
                      .attr('transform', (video)=>{
                        return 'translate(' + video['x0'] + ', ' + video['y0'] + ')'
                      })



    block.append('rect')   
         .attr('class', 'tile') 
         .attr('fill', (video)=>{
            console.log(video);
            let category = video['data']['category']

            if(category === 'Wii'){
                return 'orange'
            }else if(category === 'Drama'){
                return 'lightgreen'
            } else if(category === 'Adventure'){
                return 'coral'
            }else if(category === 'Family'){
                return 'lightblue'                
            }else if(category === 'Animation'){
                return 'pink'                
            }else if(category === 'Comedy'){
                return 'khaki'                
            }else if(category === 'Biography'){
                return 'tan'                
            }

         })   
         .attr('data-name', (video)=>{
            return video['data']['name']
         })
         .attr('data-category', (video)=>{
            return video['data']['category']
         })
         .attr('data-value', (video)=>{
            return video['data']['value']
         })   
         .attr('width', (video)=>{
            return video['x1'] - video['x0']
         }) 
         .attr('height', (video)=>{
            return video['y1'] - video['y0']
         }) 
         block.on('mouseover', (event, video)=>{
                console.log(event.movie)
                tooltip.transition()
                    .style('visibility', 'visible')

                let revenue =  video['children']['value'].toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");    
                console.log(revenue);
                tooltip.html(
                '$ ' + revenue + '<hr />' + video['data']['name']
                )  
                
                tooltip.attr('data-value',video['data']['value'] )
                })
            .on('mouseout', (movie)=>{
                tooltip.transition()
                    .style('visibility', 'hidden')


         })

         block.append('text')
         .text((video)=>{
             return video['data']['name']
         })
         .attr('x', 5)
         .attr('y', 20)

}

  



d3.json(videoDataUrl).then(
    (data, error)=>{
        if(error){
            console.log(error)
        }else{
            videoData = data
            console.log(videoData);
            drawTreeMap();
        }
    }
)