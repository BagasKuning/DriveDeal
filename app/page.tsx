import { Hero, CustomFilter, SearchBar, CarCard, ShowMore } from '@/components'
import { fuels, yearsOfProduction } from '@/constants';
import { fetchCars } from '@/utils'
import Image from 'next/image'

export default async function Home({searchParams}) {

  const allCars = await fetchCars({
    manufacturers: searchParams.manufacturer || "",
    year: searchParams.year || 2023,
    fuel: searchParams.fuel || "",
    limit: searchParams.limit || 10,
    model: searchParams.model || ""
  });
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
          <SearchBar/>

          <div className='home__filter-container'>
            <CustomFilter title="title" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>

        {
          !isDataEmpety ? (
            <section>
              <div className='home__cars-wrapper'>
                {
                  allCars.map((car) => (
                    <CarCard car={car} />
                  ))
                }
              </div>

              <ShowMore
                pageNumber={(searchParams.limit || 10) / 10}
                isNext={(searchParams.limit || 10) > allCars.length}
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
