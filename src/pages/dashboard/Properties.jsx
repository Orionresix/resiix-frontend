/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import ActionNav from '../../components/ActionNav'
import DragIndicator from '@mui/icons-material/DragIndicator'
import Reorder from '@mui/icons-material/Reorder'
import CloseFullscreen from '@mui/icons-material/CloseFullscreen'
import PropCard from '../../components/PropCard'
import PropertiesEmpty from './PropertiesEmpty'

const icons = [<Reorder />, <DragIndicator />, <CloseFullscreen />]

const cardsData = [
  {
    title: 'Card 1: Beaches',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQecWEM3hlBwWIW3KROj9E8rxbqM7giU-uSD5l6SKBeEGnKEgC-YrD4fBsboD-OtKWLPjI&usqp=CAU',
    alt: 'Beach landscape',
    description:
      "Relax and soak up the sun on some of the world's most beautiful beaches.",
    link: 'https://www.example.com/beaches', // Replace with a relevant link
  },
  {
    title: 'Card 2: Mountains',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQecWEM3hlBwWIW3KROj9E8rxbqM7giU-uSD5l6SKBeEGnKEgC-YrD4fBsboD-OtKWLPjI&usqp=CAU',
    alt: 'Majestic mountain range',
    description:
      'Experience the thrill of adventure and breathtaking scenery in the mountains.',
    link: 'https://www.example.com/mountains', // Replace with a relevant link
  },
  {
    title: 'Card 3: Cities',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQecWEM3hlBwWIW3KROj9E8rxbqM7giU-uSD5l6SKBeEGnKEgC-YrD4fBsboD-OtKWLPjI&usqp=CAU',
    alt: 'City skyline',
    description:
      'Explore vibrant cities and immerse yourself in their rich culture and history.',
    link: 'https://www.example.com/cities', // Replace with a relevant link
  },
  {
    title: 'Card 4: Forests',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQecWEM3hlBwWIW3KROj9E8rxbqM7giU-uSD5l6SKBeEGnKEgC-YrD4fBsboD-OtKWLPjI&usqp=CAU',
    alt: 'Tranquil forest landscape',
    description:
      'Connect with nature and discover the beauty of serene forests.',
    link: 'https://www.example.com/forests', // Replace with a relevant link
  },
]



const Properties = () => {
  return (
    <>
    {cardsData.length > 0 ? (
    <>
      <ActionNav title='Properties' icons={icons} />

      <div className='fluidGrid'>
        {cardsData.map((card) => (
          <PropCard
            title={card.title}
            description={card.description}
            image={card.image}
          />
        ))}
      </div>
      </>
    ) : (
      <PropertiesEmpty />
    )}
  
  </>
  )
}

export default Properties
