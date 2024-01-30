"use client"
import { Hero, CustomFilter, SearchBar, CarCard, ShowMore } from '@/components'
import { fuels, yearsOfProduction } from '@/constants';
import { fetchCars } from '@/utils'
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [allCars, setAllCars] = useState([])
  const [loading, setLoading] = useState(false)

  //search state
  const [manufacturer, setManufacturer] = useState("")
  const [model, setModel] = useState('')

  //filter state
  const [fuel, setFuel] = useState("")
  const [year, setYear] = useState(2022)

  // pagination state
  const [limit, setLimit] = useState(10)

  const getCars = async () => {
    setLoading(true)
    try{
      const result = await fetchCars({
        manufacturers: manufacturer || "",
        year: year || 2023,
        fuel: fuel || "",
        limit: limit || 10,
        model: model || ""
      });
      setAllCars(result)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }

  }

  useEffect(() => {
    getCars();
  }, [fuel, year, limit, manufacturer, model])

  const isDataEmpety = !Array.isArray(allCars) || allCars.length < 1  || !allCars

  return (
    <main className="overflow-hidden">
      <Hero/>

      <div className='mt-12 padding-x padding-y max-width'  id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore the car you might like</p>
        </div>

        <div className='home__filters'>
          <SearchBar 
            setManufacturer={setManufacturer}
            setModel={setModel}
          />

          <div className='home__filter-container'>
            <CustomFilter title="title" options={fuels} setFilter={setFuel} />
            <CustomFilter title="year" options={yearsOfProduction} setFilter={setYear} />
          </div>
        </div>

        {
          allCars.length > 0 ? (
            <section>
              <div className='home__cars-wrapper'>
                {
                  allCars.map((car) => (
                    <CarCard car={car} />
                  ))
                }
              </div>

              {loading && (
                <div className='mt-16 w-full flex items-center'>
                  <Image
                    src="/loader.svg"
                    alt="loader"
                    width={50}
                    height={50}
                    objectFit='contain'
                  />
                </div>
              )}

              <ShowMore
                pageNumber={limit / 10}
                isNext={limit > allCars.length}
                setLimit={setLimit}
              />
            </section>
          ) : (
            <div className='home__error-container'>
              <h2 className='text-black text-xl font-bold'>Opps, no result</h2>
              <p>{allCars?.massage}</p>
            </div>
          )
        }

      </div>
    </main>
  )
}
