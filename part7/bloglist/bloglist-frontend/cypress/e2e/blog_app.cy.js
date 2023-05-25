/*
*   Mocha testing library discourages arrow functions
*
*   id='test'         -> cy.get('#test')
*   className='test'  -> cy.get('.test')
*/
describe('Blog app', function () {
  const username = 'biggestman'
  const password = '12345'

  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Matti Luukkainen',
      username: username,
      password: password
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.visit('')
  })

  it('front page can be opened', function () {
    cy.contains('BlogList')
    cy.contains('Head to Login')
  })

  describe('Login', function () {
    beforeEach(function () {
      cy.contains('Head to Login').click()
      cy.get('#username').type(username)
    })

    it('succeeds with correct credentials', function () {
      cy.get('#password').type(password)
      cy.get('#login-button').click()

      cy.contains(`${username} logged in`)
    })

    it('fails with wrong credentials', function () {
      const wrongPassword = '11111'

      cy.get('#password').type(wrongPassword)
      cy.get('#login-button').click()

      cy.get('.notification')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', `${username} logged in`)
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: username, password: password })
    })

    describe('and a blog with 0 likes exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Testing the title',
          author: 'Testing the author',
          url: 'Testing the url'
        })
      })

      it('a new blog can be created', function () {
        cy.contains('Add a new Blog').click()
        cy.get('#title-input').type("Test Title One")
        cy.get('#author-input').type("Testee Tester")
        cy.get('#url-input').type("www.testing.com")

        cy.get('tr').should('have.length', 1)
        cy.contains('Create Blog').click()
        cy.get('tr').should('have.length', 2)

        cy.contains('Test Title One')
      })

      it('a user can like a blog', function () {
        cy.get('.toggleInfo').click()
        cy.get('.likes').should('contain', 'Likes: 0')
        cy.get('.likeButton').click()
        cy.get('.likes').should('contain', 'Likes: 1')
      })

      describe('and another user exists', function () {
        const newUser = {
          name: 'Mat Pat',
          username: "Matty Patty",
          password: "MATPAT"
        }

        beforeEach(function () {
          cy.request('POST', `${Cypress.env('BACKEND')}/users/`, newUser)
          cy.visit('')
        })

        it('the user who created the blog can delete it', function () {
          cy.get('.toggleInfo').click()
          cy.get('tr').should('have.length', 1)
          cy.get('#remove-button').click()
          cy.get('tr').should('have.length', 0)
        })

        it('only the creator can see the delete button of a blog', function () {
          cy.get('.toggleInfo').click()
          cy.get('#remove-button').should('be.visible')
          cy.get('#logout-button').click()
          cy.get('#toggle-button').click()
          cy.login({ username: newUser.username, password: newUser.password })

          cy.get('.toggleInfo').click()
          cy.get('#remove-button').should('not.be.visible')
        })
      })
    })

    describe('and more blogs are added and liked multiple times', function () {
      const count = 3

      beforeEach(function () {
        for (let i = 0; i < count; i++) {
          cy.createBlog({
            title: `Testing the title part ${i}`,
            author: `Testing the author part${i}`,
            url: `Testing the url part${i}`,
            likes: i
          })
        }
      })

      it('blogs are ordered according to likes in descending order', function () {
        
        // TODO: Click the like buttons instead of setting the like beforehand
        // cy.get('.toggleInfo').each(button => {
        //   cy.wrap(button).click()
        // })
        // cy.get('.likeButton').each(async button => {
        //   cy.wrap(button).click().then(() =>{
        //     cy.get('.likes').eq(0).should('contain', 'Likes: 3')
        //     cy.get('.likes').eq(1).should('contain', 'Likes: 2')
        //     cy.get('.likes').eq(2).should('contain', 'Likes: 1')
        //   })
        // })

        cy.get('.allInfo').eq(0).should('contain', 'Testing the title part 2')
        cy.get('.allInfo').eq(1).should('contain', 'Testing the title part 1')
        cy.get('.allInfo').eq(2).should('contain', 'Testing the title part 0')
      })
    })
  })
})