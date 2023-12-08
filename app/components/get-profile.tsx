'use client'

// export async function getUser(email: string) {

//    const userObj = {"email": email}

//     const response = await fetch('/api/user/userinfo', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(userObj)
//     })

//     const profile = await response.json()
//         return profile
//   }

//  export async function getUser({email}: {string || null}) {
//     const response = await fetch(`/api/user/userinfo`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({"email":email})
//     })

//     const profile = await response.json()

//         return profile
//   }
