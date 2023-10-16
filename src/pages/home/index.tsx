import { useEffect, useState } from "react";
import axiosPrivate from "../../connection";
import Company from "./../../components/company/company";
import building from "../../assets/building.svg";
import plus from "../../assets/icons/plus.svg";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [companiesList, setCompaniesList] = useState([]);

  async function getUserInfo() {
    const {
      data: {
        ceo: { companies },
      },
    } = await axiosPrivate.get("/userInfo/ceo", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    setCompaniesList(companies);
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="w-full h-full bg-white">
      <div className="flex items-center justify-center w-full h-32 rounded-b-3xl bg-purple">
        <h2 className="text-title text-white">
          Olá,
          <span className="text-gold">
            {` ${localStorage.getItem("name")?.split(" ")[0] || "Sergio"}`}
          </span>
          !
        </h2>
      </div>
      <div className="w-full h-full bg-white py-7 px-5">
        <h1 className="w-full text-2xl text-center">Selecione uma empresa</h1>
        <div className="flex flex-wrap justify-around py-4">
          {companiesList.length &&
            companiesList.map(({ company: { id, logo, name } }, key) => {
              return (
                <div className="w-32 h-40 cursor-pointer rounded-3xl" key={key}>
                  <Company img={logo || building} name={name} />
                </div>
              );
            })}
          <div
            onClick={() => {
              navigate("/newCompany");
            }}
            className="w-32 h-40 flex flex-wrap rounded-3xl cursor-pointer"
          >
            <Company
              classname="bg-purple p-5"
              img={plus}
              name="Criar empresa"
            />
          </div>
        </div>
      </div>
    </div>
  );
}