//const [cavityLength, setCavityLength] = useState(length)
import { useContext, useState } from 'react'
import CameraController from '../components/CameraController'
import Mirror from '../components/Mirror'
import Ray from '../components/Ray'
import { CavityContext } from '../ctx/CavityContext'
import { convertDegToRad } from '../helpers'

const CavityScene = () => {
  const [isResonant, setIsResonant] = useState(true) //to be done
  const { caviLength } = useContext(CavityContext) // test out countext state

  let POS_ITM = 0
  let POS_ETM = caviLength / 20
  const rayThickness = 0.05
  return (
    <>
      <CameraController />
      <ambientLight />
      <pointLight position={[0, 50, 10]} intensity={1.5} />
      <Mirror position={[POS_ITM, 0, 0]} />
      <Mirror position={[POS_ETM, 0, 0]} />
      <Ray
        rayThickness={rayThickness}
        length={10}
        color={'#ff6c65'}
        position={[-10 / 2, 0, 0]} //fixed
        rotation={[0, 0, convertDegToRad(90)]}
      />
      <Ray
        rayThickness={rayThickness}
        length={caviLength / 10}
        color={isResonant ? 'red' : '#ff6c65'}
        position={[caviLength / 10 / 2, 0, 0]}
        rotation={[0, 0, convertDegToRad(90)]}
      />
      <Ray
        rayThickness={rayThickness}
        length={10 - caviLength / 10}
        color={'#ff6c65'}
        position={[caviLength / 10 + (10 - caviLength / 10) / 2, 0, 0]}
        rotation={[0, 0, convertDegToRad(90)]}
      />
    </>
  )
}
export default CavityScene
