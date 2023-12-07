export async function getUser(email: string) {

   const userObj = {"email": email}

    const response = await fetch('http://localhost:3000/api/user/userinfo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userObj)
    })

    const profile = await response.json()
        return profile
  }