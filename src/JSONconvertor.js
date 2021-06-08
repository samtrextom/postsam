//returns and array of children that are in the parent
//this function takes an array of children (Strings)
//and checks each of the keys in the parent object if there is a match
//if there is we set that key in a new array
const objectIncludesChild = (parent, letter) =>{
  var validChildren = []
  var parentKeys = Object.keys(parent)

  parentKeys.forEach((key)=>{
    if(Array.isArray(parent[key]) && typeof parent[key][0] === "object"){
      parent[`${letter}:${key}`] = parent[key]
      delete parent[key]
      parent[`${letter}:${key}`].forEach((child)=>{
        objectIncludesChild(child,letter)
      })
    }
    // if(parentKeys.includes(child)){
    //   if(Array.isArray(parent[child]) && typeof parent[child][0] === "object"){
    //     validChildren.push(child)
    //   }
    //   else{
    //     if(Array.isArray(parent[child]) && parent[child].length === 0)
    //     {
    //       delete parent[child]
    //     }
    //   }
    // }
  })

  return validChildren
}

//iterate is where we dig deep into the data structure to find all the children
//and add an 'a:' or 'b:' before the key
const iterate = (obj, letter, decrement) =>{

  //adding a negatuve index if the obj has no id
  //this should only be applied to newly created records
  // if (!('id' in obj) || Number.isNaN(Number.parseInt(obj['id']))){
  //   obj['id'] = decrement()
  // }

  if(obj){

    //checks for matching children from the after object
    var validChildren = objectIncludesChild(obj, letter)

    // //if there are matching children we iterate through them
    // if(validChildren.length > 0){
    //   validChildren.forEach((child)=>{
    //       //creating a new key and adding the old key values to it
    //       obj[`${letter}:${child}`] = obj[child]
    //       //deleting the old key value
    //       delete obj[child]
          
    //       //remove the child from the list of children
    //       //as we have found it
    //       var index = children.indexOf(child)
    //       var newChildren = [...children]
    //       newChildren.splice(index,1)

    //       //if the new list of children is not empty
    //       //run the iterate again
    //       if(newChildren.length > 0 || !obj[`${letter}:${child}`][0].id){
    //         obj[`${letter}:${child}`].forEach((element)=>{
    //           iterate(element, newChildren, letter, decrement)
    //         })
    //       }else{
    //         obj[`${letter}:${child}`].forEach((element)=>{
    //           if (!('id' in element) || Number.isNaN(Number.parseInt(element['id']))){
    //             element['id'] = decrement()
    //           }
    //         })
    //       }
    //   })
    // }
  }
  return obj
}

//converts an object with a single child object into the JSON format the API is expecting
export const convertToJSON = (objArray, bora) =>{
  console.log(objArray)
  var newData
  var nid = -1

  const decrement = () =>{
    nid = nid -1
    return nid
  }

  iterate(objArray, bora, decrement)

  // //checking if we need to find children
  // if(children !== null){
  //     if(Array.isArray(objArray)){
  //       objArray.forEach((obj)=>{
  //         iterate(obj, bora, decrement)
  //       })
  //       newData = objArray
  //     }
  //     else{
  //       var b = iterate(objArray, bora, decrement)
  //       newData = [b]
  //     }
  // }
  // //putting the objects into arrays
  // else{
  //     newData = objArray
  // }

  console.log(objArray)

  //create a new JSON object with an 'a:' and 'b:' before the parents
  let JSONRes ={}
  //JSONRes[`${bora}:${parent}`] = newData
  return objArray
}