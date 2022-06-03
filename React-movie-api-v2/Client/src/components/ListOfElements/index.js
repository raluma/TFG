import Element from '../Element'

export default function ListOfElements({ element }) {
  return element.map(({ id, name , title, url, media_type }) => 
      <Element
        key = {id}
        id = {id}
        name = {name}
        title = {title}
        image = {url}
        type = {media_type}
      /> 
  )
}

