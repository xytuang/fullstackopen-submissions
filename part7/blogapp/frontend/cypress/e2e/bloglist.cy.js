describe('Blog app', function(){
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      username: 'roger',
      name: 'roger',
      password: 'roger'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })
  it('login page shown', function () {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
  })
  describe('Login', function(){
    it('succeeds with valid credentials', function(){
      cy.get('#username').type('roger')
      cy.get('#password').type('roger')
      cy.get('#login-button').click()

      cy.contains('roger logged in')
    })
    it('fails with invalid credentials', function(){
      cy.get('#username').type('roger')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.contains('wrong username or password')
    })
  })

  describe('when logged in', function(){
    beforeEach(function(){
      cy.login({username: 'roger', password: 'roger'})
    })
    it('can create new blog', function(){
      cy.contains('new blog').click()
      cy.get('#title').type('a cypress note')
      cy.get('#author').type('a person')
      cy.get('#url').type('url')
      cy.get('#create-button').click()
      cy.contains('a cypress note - a person').parent().contains('view').click()
      cy.contains('url')
    })
    describe('and a blog exists', function(){
      beforeEach(function(){
        cy.createBlog({
          title: 'another blog cypress',
          author: 'another person',
          url: 'something'
        })
      })
      it('it can be liked', function(){
        cy.contains('another blog cypress - another person').parent().contains('view').click()
        cy.contains('another blog cypress - another person').parent().find('#like-button').click()
        cy.contains('likes 1')
      })
      it('it can be deleted', function(){
        cy.contains('another blog cypress - another person').parent().contains('view').click()
        cy.contains('another blog cypress - another person').parent().find('#delete-button').click()
        cy.get('html').should('not.contain', 'another blog cypress - another person')
      })
    })
    describe('several blogs exist', function(){
      beforeEach(function(){
        cy.createBlog({
          title: 'first',
          author: 'one',
          url: 'something'
        })
        cy.createBlog({
          title: 'second',
          author: 'two',
          url: 'something'
        })
        cy.createBlog({
          title: 'third',
          author: 'three',
          url: 'something'
        })
      })
      it('and are sorted by likes', function(){
        cy.contains('third - three').parent().contains('view').click()
        cy.contains('third - three').parent().find('#like-button').click().click().click()

        cy.contains('second - two').parent().contains('view').click()
        cy.contains('second - two').parent().find('#like-button').click()
      })
    })
  })
})
  