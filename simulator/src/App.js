import './App.css'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import { i } from 'mathjs'
import { useEffect, useState } from 'react'

// TODO: extract to utils file or use mathjs:
const deg2rad = (degrees) => degrees * (Math.PI / 180)
const rad2deg = (rad) => rad * (180 / Math.PI)

function App() {
  // configurable variables:
  const [cavitylength, setCavitylength] = useState(200)
  const [laserpower, setLaserpower] = useState(1) // in W.
  const [m1reflectivity, setM1reflectivity] = useState(0.9)
  const [m2reflectivity, setM2reflectivity] = useState(0.9)
  const [opticalgain, setOpticalgain] = useState(0)
  const [wavelength, setWavelength] = useState(200)

  // calculated variables:
  const [wavenumber, setWavenumber] = useState(undefined)
  const [phaseshift, setPhaseshift] = useState(undefined)
  const [m1transmittance, setM1transmittance] = useState(0)
  const [m2transmittance, setM2transmittance] = useState(0)

  useEffect(() => {
    setWavenumber((2 * Math.PI) / wavelength)
  }, [wavelength])

  useEffect(() => {
    setPhaseshift(((wavenumber * 10 * cavitylength) / 10) % (2 * Math.PI))
  }, [wavenumber, cavitylength])

  useEffect(() => {
    setM1reflectivity((x) => {
      setM1transmittance(Math.sqrt(1.0 - Math.pow(x, 2)))
      return x
    })
    setM2reflectivity((x) => {
      setM2transmittance(Math.sqrt(1.0 - Math.pow(x, 2)))
      return x
    })
  }, [m1reflectivity, m2reflectivity])

  // TODO correctly implement i
  useEffect(() => {
    console.log(
      `Optical Gain: ${
        m1transmittance /
        (1 -
          Math.pow(
            (m1reflectivity * m2reflectivity * Math.E,
            2 * i * wavenumber * cavitylength)
          ))
      }`
    )
    setOpticalgain(
      m1transmittance /
        (1 -
          Math.pow(
            (m1reflectivity * m2reflectivity * Math.E,
            2 * i * wavenumber * cavitylength)
          ))
    )
  }, [
    m1reflectivity,
    m2reflectivity,
    m1transmittance,
    wavenumber,
    cavitylength,
  ])

  return (
    <MathJaxContext>
      <div className="App">
        <div className="controls">
          <label>
            Laser Power
            <MathJax>{`\\(P\\)`}</MathJax>
            <input
              type="number"
              min="0"
              max="5000"
              step="1"
              onChange={(e) => setLaserpower(e.target.value)}
              value={laserpower}
            />
            W
          </label>

          <label>
            Cavity Length
            <MathJax>{`\\(L\\)`}</MathJax>
            <input
              type="number"
              value={cavitylength}
              min="0"
              max="100000"
              onChange={(e) => setCavitylength(e.target.value)}
            />
            nm
          </label>

          <label>
            <a href="https://en.wikipedia.org/wiki/Wavelength">Wavelength</a>
            <MathJax>{`\\(\\lambda\\)`}</MathJax>
            <input
              type="number"
              min="0"
              max="1000"
              step="0.1"
              onChange={(e) => setWavelength(e.target.value)}
              value={wavelength}
            />
            nm
          </label>

          <label>
            <a href="https://en.wikipedia.org/wiki/Reflectance#Reflectivity">
              Reflectivity
            </a>
            <MathJax>{`\\(r_n\\)`}</MathJax>
            Mirror 1 (fixed)
            <input
              type="number"
              value={m1reflectivity}
              min="0"
              max="1"
              step="0.01"
              onChange={(e) => setM1reflectivity(e.target.value)}
            />
          </label>

          <label>
            Mirror 2 (piezo)
            <input
              type="number"
              value={m2reflectivity}
              min="0"
              max="1"
              step="0.01"
              onChange={(e) => setM2reflectivity(e.target.value)}
            />
          </label>
        </div>
        <hr />
        <div className="results">
          <label>
            <a href="https://en.wikipedia.org/wiki/Wavenumber">
              Angular Wave Number
            </a>
            <MathJax>
              {`\\(
            k = \\frac{2\\pi}{\\lambda}
            \\)`}
            </MathJax>
            <input type="text" value={wavenumber} disabled />
          </label>
          <hr />
          <label>
            <a href="https://en.wikipedia.org/wiki/Phase_(waves)#Phase_shift">
              Phase Shift
            </a>
            <MathJax>
              {`\\(
            \\phi = k L \\,\\, \\mathrm{mod}\\,\\, 2\\pi
            \\)`}
            </MathJax>
            <input type="text" value={phaseshift} disabled />
            rad
            <br />
            <input type="text" value={rad2deg(phaseshift)} disabled />
            deg
          </label>
          <hr />

          <label>
            <a href="https://de.wikipedia.org/wiki/Transmission_(Physik)">
              Transmittance
            </a>
            <MathJax>
              {`\\(
            t_n = \\sqrt{1 - r_n^2}
            \\)`}
            </MathJax>
            Mirror 1 (fixed)
            <input type="text" value={m1transmittance} disabled />
          </label>

          <label>
            Mirror 2 (piezo)
            <input type="text" value={m2transmittance} disabled />
          </label>
        </div>
      </div>
    </MathJaxContext>
  )
}

export default App
