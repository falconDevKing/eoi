import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { Modal, Menu, Dropdown } from 'antd';
import { Table } from 'antd';
import axios from 'axios';
import { skillData, educationA, educationData, stateData, skillEdit, learningEdit } from './constants'
import validator from 'validator';

const Dashboard = ({ bgDash, setDataExp }) => {

  //Theme
  let change = 'bg-dark text-white'
  let modalBg = '#14147A'
  let modalCol = '#14147A'
  let bgCard = 'bg-darkCard'
  let cardText = 'text-white'


  if (bgDash) {
    change = 'bg-lightDash text-dark'
    modalBg = '#EDF1F7'
    modalCol = '#14147A'
    bgCard = 'bg-white'
    cardText = 'text-dark'
  }
  else {
    change = 'bg-dark text-white'
    modalBg = '#14147A'
    modalCol = '#FFF'
    bgCard = 'bg-darkCard'
    cardText = 'text-white'
  }


  const [modify, setModify] = useState({});

  //Input states and validation

  const [name, setName] = useState(modify?.fullname);
  const [email, setEmail] = useState(modify?.email);
  const [phone, setPhone] = useState(modify?.phone);
  const [location, setLocation] = useState(modify?.city);
  const [selectedGender, setSelectedGender] = useState(modify?.gender);
  const [selectedQualification, setSelectedQualification] = useState(modify?.education);

  const [selectedSkill, setSelectedSkill] = useState(modify?.skill);
  const [selectedKnowledge, setSelectedKnowledge] = useState(modify?.knowledge);
  const [challenge, setChallenge] = useState(modify?.challenges);

  const [selectedUnderstand, setSelectedUnderstand] = useState(modify?.tnc);
  const [pastProject, setPastProject] = useState(modify?.projects_details);
  const [career, setCareer] = useState(modify?.career_brief);
  const [gitHub, setGitHub] = useState(modify?.github_url);
  const [whyJoin, setWhyJoin] = useState(modify?.join_network);

  const [nameValid, setNameValid] = useState('');
  const [emailValid, setEmailValid] = useState('');
  const [phoneValid, setPhoneValid] = useState('');
  const [locationValid, setLocationValid] = useState('');
  const [selectedGenderValid, setSelectedGendeValid] = useState('');
  const [selectedQualificationValid, setSelectedQualificationValid] = useState('');


  const [skillValid, setSkillValid] = useState('');
  const [knowledgeValid, setKnowledgeValid] = useState('');
  const [challengeValid, setChallengeValid] = useState('');


  const [understandValid, setUnderstandValid] = useState('');
  const [pastProjectValid, setPastProjectValid] = useState('');
  const [careerValid, setCareerValid] = useState('');
  const [gitHubValid, setGitHubValid] = useState('');
  const [whyJoinValid, setWhyJoinValid] = useState('');

  const [states, setState] = useState('');
  const [education, setEducation] = useState('');
  const [skill, setSkill] = useState('');
  const [modalData, setModalData] = useState({})
  const [dataT, setData] = useState([])
  const [resources, setResources] = useState([])

  const [deleted, setDelete] = useState(false)
  const [edited, setEdit] = useState(false)

  const handleState = (event) => {
    setState(event.target.value);
  };

  const handleEducation = (event) => {
    setEducation(event.target.value);
  };

  const handleSkill = (event) => {
    setSkill(event.target.value);
  };


  //Modals Logic
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setIsModalEdit(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalEdit(false);
  };


  //fetch Data
  useEffect(() => {
    axios("https://teaminnovation-endpoint.herokuapp.com/eoi-list/")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
  }, [deleted, edited]);




  //filter logic
  const filterState = (data) => {
    if (states == '') {
      return data
    }
    return data.filter(e => e.city === states)
  }
  const filterEducation = (data) => {
    if (education == '') {
      return data;
    };
    return data.filter(e => e.education === education);
  }

  const filterSkill = (data) => {
    if (skill == '') {
      return data
    }
    return data.filter(e => e.skill === skill)
  }


  const filteredData = (data) => {
    const filteredStates = filterState(data);
    const filteredEducation = filterEducation(filteredStates);
    const filteredSkill = filterSkill(filteredEducation);

    return filteredSkill
  }

  useEffect(() => {
    const filtered = filteredData(dataT)
    setResources(filtered)
    setDataExp(filtered)
  }, [dataT, states, skill, education])

  //delete 
  const deleteResource = (id) => {
    axios.delete(`https://teaminnovation-endpoint.herokuapp.com/eoi-delete/${id}`)
      .then((response) => {
        console.log(response)
        setDelete(!deleted)

      })
      .catch((error) => console.error(`Error: ${error}`));
  }

  //dropdown and table logic
  const menu = (record) => (<Menu>
    <Menu.Item>
      <div
        className={'flex text-dark'}
        onClick={() => {
          setModalData(resources.filter(e => e.id === record.id)[0])
          showModal()
        }}
      >
        <Icon icon="carbon:view-filled" className={'mx-1 text-2xl  text-dark'} /> View
        </div>
    </Menu.Item>
    <Menu.Item>
      <div
        className={'flex text-dark'}
        onClick={() => {
          setModify(record)
          setIsModalEdit(true)
        }}
      >
        <Icon icon="ant-design:edit-outlined" className={'mx-1 text-2xl  text-dark'} /> Edit
        </div>
    </Menu.Item>
    <Menu.Item className={'flex'} danger onClick={() => deleteResource(record.id)} >
      <div className={'flex'}>
        <Icon icon="ic:round-delete-forever" className={'mx-1 text-2xl text-red-500'} /> Delete
        </div>
    </Menu.Item>
  </Menu>
  );

  const tableColumns = [
    {
      title: 'Email',
      dataIndex: 'email',
      render: (text, record) =>
        <div
          className={`${change} p-1`}
          onClick={() => {
            setModalData(resources.filter(e => e.id === record.id)[0])
            showModal()
          }}
        >
          {text}
        </div>
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      render: (text, record) =>
        <div
          className={`${change} p-1`}
          onClick={() => {
            setModalData(resources.filter(e => e.id === record.id)[0])
            showModal()
          }}
        >
          {text}
        </div>
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      sorter: (a, b) => {
        const nameA = a.gender;
        const nameB = b.gender;



        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        //names being equal
        return 0;
      },
      render: (text, record) =>
        <div
          className={`${change} p-1`}
          onClick={() => {
            setModalData(resources.filter(e => e.id === record.id)[0])
            showModal()
          }}
        >
          {text}
        </div>
    },
    {
      title: 'Skill',
      dataIndex: 'skill',
      sorter: (a, b) => {
        const nameA = a.skill;
        const nameB = b.skill;



        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        //names being equal
        return 0;
      },
      render: (text, record) =>
        <div
          className={`${change} p-1`}
          onClick={() => {
            setModalData(resources.filter(e => e.id === record.id)[0])
            showModal()
          }}
        >
          {text}
        </div>
    },
    {
      title: 'State',
      dataIndex: 'city',
      sorter: (a, b) => {
        const nameA = a.city;
        const nameB = b.city;



        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        //names being equal
        return 0;
      },
      render: (text, record) =>
        <div
          className={`${change} p-1`}
          onClick={() => {
            setModalData(resources.filter(e => e.id === record.id)[0])
            showModal()
          }}
        >
          {text}
        </div>
    },
    {
      title: '',
      dataIndex: 'dropdown',
      render: (text, record) =>
        <Dropdown overlay={() => menu(record)} trigger={['hover', 'click']}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            <Icon icon="clarity:ellipsis-horizontal-line" className={'mx-1 text-2xl text-gray-600'} />
          </a>
        </Dropdown>

    },
  ];
  // Data submission and validation
  const sendData = (id) => {
    axios.post(`https://teaminnovation-endpoint.herokuapp.com/eoi-update/${id}/`, {
      fullname: name ? name : modify.fullname,
      education: selectedQualification ? selectedQualification : modify.education,
      skill: selectedSkill ? selectedSkill : modify.skill,
      knowledge: selectedKnowledge ? selectedKnowledge : modify.knowledge,
      city: location ? location : modify.city,
      phone: phone ? phone : modify.phone,
      github_url: gitHub ? gitHub : modify.github_url,
      email: modify.email,
      challenges: modify.challenges,
      projects_details: modify.projects_details,
      career_brief: modify.career_brief,
      join_network: modify.join_network,
      tnc: modify.tnc,
      gender: modify.gender,
    })
      .then((response) => {
        console.log('res', response);
        handleOk()
        setEdit(!edited)
      })
      .catch((error) => console.error(`Error: ${error}`));
  }

  const submitForm = (id) => {



    name === undefined ? setNameValid(true) : setNameValid(validator.isLength(name, { min: 2, max: 50 }))
    phone === undefined ? setPhoneValid(true) : setPhoneValid(validator.isMobilePhone(phone))
    gitHub === undefined ? setGitHubValid(true) : setGitHubValid(validator.isURL(gitHub))

    setLocationValid(true)
    setSkillValid(true)
    setSelectedQualificationValid(true)
    setKnowledgeValid(true)
    setEmailValid(true)
    setSelectedGendeValid(true)
    setChallengeValid(true)
    setUnderstandValid(true)
    setPastProjectValid(true)
    setCareerValid(true)
    setWhyJoinValid(true)

    if (nameValid && emailValid && phoneValid && locationValid && selectedGenderValid && selectedQualificationValid && pastProjectValid && careerValid && gitHubValid && whyJoinValid && understandValid && skillValid && knowledgeValid && challengeValid) {
      sendData(id)
    }
  }

  return (
    <div className={`flex flex-col ${change} px-6 lg:px-12 py-4 lg:py-2 h-full overflow-auto`}>
      <div className={'py-4 flex items-center justify-center'}>
        <div className={'text-sm sm:text-xl  lg:text-2xl'}> Admin Dashboard / &nbsp; </div>
        <div className={'text-xs sm:text-base text-orangee '}> Expression of Interest  </div>
      </div>

      <div className={'flex flex-col xl:flex-row py-4 w-full xl:items-center'}>
        <div className={'lg:basis-2/5 lg:mb-3 xl:my-0 w-3/4 self-end'}>
          <div className={'flex items-center py-1 px-4 lg:px-8 mx-2 lg:mx-4 bg-white rounded-tl-xl rounded-br-xl'}>
            <Icon icon="akar-icons:search" className={'mx-1 text-2xl text-gray-600'} />
            <input type='text' placeholder='search' className={'w-full text-lg bg-transparent text-gray-600 border-b-2 border-white hover:border-blue-500 focus:border-blue-500 outline-none'} />
          </div>
        </div>

        <div className={'basis-3/5 w-full flex flex-col space-y-4 md:space-y-0 md:flex-row justify-between pl-0 lg:pl-8 pt-4 lg:pt-0'}>

          <div className={'flex items-center bg-orangee px-3 py-2 rounded-tr-lg rounded-bl-lg'}>
            <Icon icon="vaadin:date-input" className={'mx-1 text-xl text-white'} />
            <select className={'bg-transparent text-white w-full  outline-none'} onChange={(e) => handleState(e)}>
              <option value="" className={'text-dark bg-white '} >State</option>
              {stateData.map(e => <option value={e} className={'text-dark bg-white '} >{e}</option>)}
            </select>
          </div>



          <div className={'flex items-center bg-orangee px-3 py-2 rounded-tr-lg rounded-bl-lg'}>
            <Icon icon="icon-park-outline:degree-hat" className={'mx-1 text-xl text-white'} />
            <select className={'bg-transparent text-white outline-none  w-full'} onChange={(e) => handleEducation(e)}>
              <option value="" className={'text-dark bg-white '} >Education</option>
              {educationData.map(e => <option value={e} className={'text-dark bg-white '} >{e}</option>)}
            </select>
          </div>

          <div className={'flex items-center bg-orangee px-3 py-2 rounded-tr-lg rounded-bl-lg'}>
            <Icon icon="mdi:weight-lifter" className={'mx-1 text-xl text-white'} />
            <select className={'bg-transparent text-white  outline-none  w-full'} onChange={(e) => handleSkill(e)}>
              <option value="" className={'text-dark bg-white '} >Skill</option>
              {skillData.map(e => <option value={e[1]} className={'text-dark bg-white '} >{e[0]}</option>)}
            </select>
          </div>

        </div>
      </div>

      <div className={'pt-4 lg:bg-white text-white lg:border-2 border-white '} >

        {/* Table Render */}
        <Table
          columns={tableColumns}
          rowKey="id"
          dataSource={resources}
          size='small'
          className={'bg-white text-white border-2 border-gray-500 text-2xl hidden lg:contents '}
          rowClassName={`${change}`}
          pagination={{ simple: true, defaultPageSize: 8 }}
        />

        {/* Mobile info render */}
        <div className={`h-full lg:hidden flex flex-col overflow-auto`}>
          {resources.map(e => (
            <div className={`flex flex-col my-2 border-2 border-darkCard ${cardText}`}>
              <div className={`w-full ${bgCard} text-dark px-2`}>
                <div className={'flex justify-between py-1 space-x-4'}>
                  <div className={'font-semibold'}>{e.email}</div>
                  <div>{e.gender}</div>
                </div>
                <div className={'flex justify-between space-x-4'}>
                  <div>{e.city}</div>
                  <div>
                    <Dropdown overlay={() => menu(e)} trigger={['click', 'hover']}>
                      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        <Icon icon="clarity:ellipsis-horizontal-line" className={'mx-1 text-2xl text-gray-600'} />
                      </a>
                    </Dropdown>
                  </div>
                </div>
              </div>

              <div className={'flex justify-between px-2 py-1 space-x-4'}>
                <div>Skill</div>
                <div className={'font-medium'}>{e.skill}</div>
              </div>

              <div className={'flex justify-between px-2 py-1 space-x-4'}>
                <div>Phone Number</div>
                <div className={'font-medium'}>{e.phone}</div>
              </div>
            </div>)
          )
          }
        </div>


        {/* Modal for viewing */}
        <Modal title={modalData.fullname} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText={<div className={'text-dark'}>OK</div>} bodyStyle={{ height: '400px', overflow: 'auto', background: modalBg, color: modalCol }} closable cancelButtonProps={{ style: { display: 'none' } }}>

          <div class={'text-xs'}>
            <div className={'font-semibold text-base text-center'}>Career Details</div>
            <div className={'flex flex-col my-2'}>
              <span className={'font-medium text-sm'}>Skill:</span>
              <span>{modalData.skill} </span>
            </div>
            <div className={'flex items-center my-2'}>
              <div className={'basis-1/3 flex flex-col'}>
                <span className={'font-medium text-sm'}>Skill Proficieny:</span>
                <span>{modalData.knowledge} </span>
              </div>

              <div className={'basis-1/3 flex flex-col'}>
                <span className={'font-medium text-sm'}>Education:</span>
                <span>{modalData.education} </span>
              </div>

              <div className={'basis-1/3 flex flex-col'}>
                <span className={'font-medium text-sm'}>Job Disclaimer:</span>
                <span> {modalData.tnc ? 'YES' : 'NO'} </span>
              </div>
            </div>

            <div className={'flex flex-col my-2'}>
              <span className={'font-medium text-sm'}>GitHub:</span>
              <span>{modalData.github_url} </span>
            </div>

            <div className={'flex flex-col my-2'}>
              <span className={'font-medium text-sm'}>Projects:</span>
              <span>{modalData.projects_details} </span>
            </div>

            <div className={'flex flex-col my-2'}>
              <span className={'font-medium text-sm'}>Most Challenging:</span>
              <span>{modalData.chanllenges} </span>
            </div>

            <div className={'flex flex-col my-2'}>
              <span className={'font-medium text-sm'}>Career Journey:</span>
              <span>{modalData.career_brief} </span>
            </div>

            <div className={'flex flex-col my-2'}>
              <span className={'font-medium text-sm'}>Reason:</span>
              <span>{modalData.join_network} </span>
            </div>

          </div>
        </Modal>


        {/* Modal for editting */}
        <Modal title={`Edit - ${modify.fullname}`} visible={isModalEdit} onOk={handleOk} onCancel={handleCancel} okText={<div className={'text-dark'}>OK</div>} bodyStyle={{ height: '400px', overflow: 'auto', background: modalBg, color: modalCol }} closable cancelButtonProps={{ style: { display: 'none' } }}>

          <div class={'text-xs'}>
            <div className={'font-semibold text-base text-center'}>Update Details</div>
            <div className={'flex flex-col w-full'}>
              <div className={'font-semibold text-sm lg:text-base'}>Full Name <span className={'text-red-600'} >*</span></div>
              <div><input type='text' defaultValue={modify?.fullname} className={'w-full bg-transparent text-sm my-2 border-b-2 border-grey-700 hover:border-blue-500 focus:border-blue-500 outline-none'} onChange={(e) => setName(validator.trim(e.target.value))} /></div>

            </div>

            <div className={'flex flex-col  z-40'}>
              <div className={'font-semibold text-sm lg:text-base'}>Phone Number <span className={'text-red-600'} >*</span></div>
              <div><input type='tel' defaultValue={modify?.phone} className={'w-full bg-transparent text-sm my-2 border-b-2 border-grey-700 hover:border-blue-500 focus:border-blue-500 outline-none'} onChange={(e) => setPhone(validator.trim(e.target.value))} /></div>
              {phoneValid === '' ? '' : phoneValid ? '' : <div className={`text-red-500 text-xs`}>Please input correct phone number </div>}

            </div>

            <div className={'flex flex-col w-full'}>
              <div className={'font-semibold text-sm lg:text-base'}>Education <span className={'text-red-600'} >*</span></div>
              <div>
                <select defaultValue={modify?.education} className={'bg-transparent text-white w-full my-2 border-b-2 border-white outline-none'} onChange={(e) => setSelectedQualification(validator.trim(e.target.value))}>

                  {educationA.map(e => <option key={e} value={e} className={'text-dark bg-white text-sm '} >{e}</option>)}
                </select>
              </div>

            </div>

            <div className={'flex flex-col w-full'}>
              <div className={'font-semibold text-sm lg:text-base'}>State of residence? (In Nigeria) <span className={'text-red-600'} >*</span></div>
              <div>
                <select defaultValue={modify?.city} className={'bg-transparent text-white w-full my-2 border-b-2 border-white outline-none'} onChange={(e) => setLocation(validator.trim(e.target.value))}>

                  {stateData.map(e => <option key={e} value={e} className={'text-dark bg-white text-sm '} >{e}</option>)}
                </select>
              </div>

            </div>


            <div className={'flex flex-col w-full'}>
              <div className={'font-semibold text-sm lg:text-base'}>Skill? <span className={'text-red-600'} >*</span></div>
              <div>
                <select defaultValue={modify?.skill} className={'bg-transparent text-white w-full my-2 border-b-2 border-white outline-none'} onChange={(e) => setSelectedSkill(validator.trim(e.target.value))}>

                  {skillEdit.map(e => <option key={e} value={e} className={'text-dark bg-white text-sm '} >{e}</option>)}
                </select>
              </div>

            </div>



            <div className={'flex flex-col w-full'}>
              <div className={'font-semibold text-sm lg:text-base'}>Proficiency? <span className={'text-red-600'} >*</span></div>
              <div>
                <select defaultValue={modify?.knowledge} className={'bg-transparent text-white w-full my-2 border-b-2 border-white outline-none'} onChange={(e) => setSelectedKnowledge(validator.trim(e.target.value))}>

                  {learningEdit.map(e => <option key={e} value={e} className={'text-dark bg-white text-sm '} >{e}</option>)}
                </select>
              </div>

            </div>

            <div className={'flex flex-col w-full'}>
              <div className={'font-semibold text-sm lg:text-base'}>Github URL? </div>
              <div>
                <input type='text' defaultValue={modify?.github_url} onChange={(e) => setGitHub(e.target.value)} className={'w-full bg-transparent my-2 border-b-2 border-grey-700 hover:border-blue-500 focus:border-blue-500 outline-none text-sm'} />
              </div>
              {gitHubValid === '' ? '' : gitHubValid ? '' : <div className={`text-red-500 text-xs`}>Please enter your valid GitHub url </div>}
            </div>

            <div className={'font-bold w-36 mx-auto px-10 py-1 tracking-widest rounded-tr-md rounded-bl-md border-blue-600 border-2 text-white bg-blue-600  hover:cursor-pointer'} onClick={() => submitForm(modify?.id)}>
              Submit
            </div>

          </div>



        </Modal>


      </div>

    </div>
  )
}

export default Dashboard;
