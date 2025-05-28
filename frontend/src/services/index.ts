import axios from 'axios'

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // http://localhost:8000/api/
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

// /api/students/{sbd}
const getResultByStudentSBD = async (sbd: string) => {
  try {
    const result = await axiosClient.get(`students/${sbd}`)
    return result?.data
  } catch (error) {
    console.log(error)
    return null
  }
}

// /api/students/overall
const getOverall = async () => {
  try {
    const result = await axiosClient.get(`students/overall`)
    return result?.data
  } catch (error) {
    console.log(error)
    return null
  }
}

// /api/students/top-a
const getBestStudentsGroupA = async () => {
  try {
    const result = await axiosClient.get(`students/top-a`)
    return result?.data
  } catch (error) {
    console.log(error)
    return []
  }
}

// /api/students/subject-performance
const getSubjectPerformance = async () => {
  try {
    const result = await axiosClient.get(`students/subject-performance`)
    return result?.data
  } catch (error) {
    console.log(error)
    return {}
  }
}

// /api/students/score-distribution/{subject}
const getScoreDistributionBySubject = async (subject: string) => {
  try {
    const result = await axiosClient.get(`students/score-distribution/${subject}`)
    return result?.data
  } catch (error) {
    console.log(error)
    return []
  }
}

// /api/students/top-by-subject?subject=xxx&limit=yyy
const getTopStudentBySubject = async (subject: string, limit: number) => {
  try {
    const result = await axiosClient.get(`students/top-by-subject?subject=${subject}&limit=${limit}`)
    return result?.data
  } catch (error) {
    console.log(error)
    return []
  }
}

export {
  getResultByStudentSBD,
  getOverall,
  getBestStudentsGroupA,
  getSubjectPerformance,
  getScoreDistributionBySubject,
  getTopStudentBySubject
}
