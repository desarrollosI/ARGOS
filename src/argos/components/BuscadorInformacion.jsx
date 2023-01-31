
import React, { useCallback, useRef, useState } from 'react'
import ReactTags from 'react-tag-autocomplete'

import './css/tag.css';

export function BuscadorInformacion () {
  const [tags, setTags] = useState([])

  const [suggestions, setSuggestions] = useState([
    { id: 1, name: "Violencia" },
    { id: 2, name: "Sin Violencia" },
    { id: 3, name: "Casa habitacion" },
    { id: 4, name: "Auto" },
    { id: 5, name: "transeunte" },
    { id: 6, name: "de tentativa" }
  ])

  const reactTags = useRef()

  const onDelete = useCallback((tagIndex) => {
    setTags(tags.filter((_, i) => i !== tagIndex))
  }, [tags])

  const onAddition = useCallback((newTag) => {
    setTags([...tags, newTag])
  }, [tags])

  return (
    <ReactTags
      ref={reactTags}
      tags={tags}
      suggestions={suggestions}
      onDelete={onDelete}
      onAddition={onAddition}
      allowNew
      minQueryLength={1}
      placeholderText={'Busca una categoría o dato abierto'}
    />
  )
}
