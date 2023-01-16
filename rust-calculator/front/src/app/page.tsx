/* eslint-disable @next/next/no-img-element */
'use client';

import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from './page.module.css';
import { Fragment, useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

type Item = 'wood' | 'charcoal' | 'gunPowder' | 'explosives' | 'rocket' | string;

interface Item_ {
  data: {
    title: string;
    img: string;
    desc: string;
    craftable: boolean;
  };
  recipe: {
    [key: string]: number;
  };
}

export default function Home(this: any): JSX.Element {
  const [count, setCount] = useState(1);
  const [itemSelected, setItemSelected] = useState<Item>('rocket');

  const items: Record<Item, Item_> = {
    techTrash: {
      data: {
        title: 'Tech Trash',
        img: 'techparts',
        desc: '',
        craftable: false,
      },
      recipe: {},
    },
    cloth: {
      data: {
        title: 'Cloth',
        img: 'cloth',
        desc: '',
        craftable: false,
      },
      recipe: {},
    },
    animalFat: {
      data: {
        title: 'Animal Fat',
        img: 'fat.animal',
        desc: '',
        craftable: false,
      },
      recipe: {},
    },
    sulfur: {
      data: {
        title: 'Sulfur',
        img: 'sulfur',
        desc: '',
        craftable: false,
      },
      recipe: {},
    },
    metalPipe: {
      data: {
        title: 'Metal Pipe',
        img: 'metalpipe',
        desc: '',
        craftable: false,
      },
      recipe: {},
    },
    metalFragments: {
      data: {
        title: 'Metal Fragments',
        img: 'metal.fragments',
        desc: '',
        craftable: false,
      },
      recipe: {},
    },
    lowGradeFuel: {
      data: {
        title: 'Low Grade Fuel',
        img: 'lowgradefuel',
        desc: '',
        craftable: true,
      },
      recipe: {
        animalFat: 1,
        cloth: 1,
      },
    },
    wood: {
      data: {
        title: 'Wood',
        img: '',
        desc: '',
        craftable: false,
      },
      recipe: {},
    },
    charcoal: {
      data: {
        title: 'Charcoal',
        img: 'charcoal',
        desc: '',
        craftable: false,
      },
      recipe: {
        wood: 1 * 0.75,
      },
    },
    gunPowder: {
      data: {
        title: 'Gun Powder',
        img: 'gunpowder',
        desc: '',
        craftable: true,
      },
      recipe: {
        sulfur: 100,
        charcoal: 100,
      },
    },
    explosives: {
      data: {
        title: 'Explosives',
        img: 'explosives',
        desc: '',
        craftable: true,
      },
      recipe: {
        gunPowder: 50,
        lowGradeFuel: 3,
        metalFragments: 10,
        sulfur: 10,
      },
    },
    rocket: {
      data: {
        title: 'Rocket',
        img: 'ammo.rocket.basic',
        desc: '',
        craftable: true,
      },
      recipe: {
        sulfur: 1300,
        gunPowder: 650,
        explosives: 10,
        lowGradeFuel: 30,
        metalFragments: 100,
        metalPipe: 2,
      },
    },
    timedExplosiveCharge: {
      data: {
        title: 'Timed Explosive Charge',
        img: 'explosive.timed',
        desc: '',
        craftable: true,
      },
      recipe: {
        sulfur: 1300,
        gunPowder: 650,
        explosives: 10,
        lowGradeFuel: 30,
        metalFragments: 100,
        metalPipe: 2,
        techTrash: 2,
      },
    },
    explosive5_56RifleAmmo: {
      data: {
        title: 'Explosive 5.56 Rifle Ammo',
        img: 'ammo.rifle.explosive',
        desc: '',
        craftable: true,
      },
      recipe: {
        metalFragments: 10,
        gunPowder: 20,
        sulfur: 10,
      },
    },
  };

  useEffect(() => {
    console.log(Object.keys(items[itemSelected].recipe));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={styles.main}>
      <section className={styles.itemSelector}>
        <img src={`/img/icons/${items[itemSelected].data.img}.png`} alt='' />

        <select
          name='item-selector'
          id='item-selector'
          onChange={(Evt: {
            target: {
              value: any;
            };
          }) => {
            setCount(1);
            setItemSelected(Evt.target.value);
          }}
          value={itemSelected}
        >
          {Object.keys(items).map((Itm, Idx) => {
            if (Object.values(items)[Idx].data.craftable) {
              return (
                <option key={Idx} value={Itm}>
                  {Object.values(items)[Idx].data.title}
                </option>
              );
            }
          })}
        </select>

        <input
          type='number'
          min={1}
          onChange={(Evt) => setCount(parseInt(Evt.target.value.length === 0 ? '0' : Evt.target.value))}
          value={count}
        />
      </section>

      <div className={styles.items}>
        {Object.values(items[itemSelected].recipe).map((Itm, Idx) => {
          return (
            <div key={Idx} className={styles.item}>
              <img src={`/img/icons/${items[Object.keys(items[itemSelected].recipe)[Idx]].data.img}.png`} alt='' />
              <span>{items[Object.keys(items[itemSelected].recipe)[Idx]]?.data?.title}</span>
              <span>{new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(Itm * count)}</span>
            </div>
          );
        })}
      </div>
    </main>
  );
}
