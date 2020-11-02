describe('the blog', () => {
  it('should show the title', function () {
    cy.visit('http://localhost:3000')
    cy.contains("CP's Blog")
  })

  it('should allow creating a post', function() {
    cy.visit('http://localhost:3000')
    cy.get('#newPost').click()
    cy.get('#blogtitle').type('NEW BLOG TITLE 001')
    cy.get('#blogbody').type('NEW BLOG BODY 001')
    cy.get('#blogEditSave').click()
    cy.contains('NEW BLOG TITLE 001')
    cy.contains('NEW BLOG BODY 001')
  })

  it('should allow editing a post', function() {
    cy.visit('http://localhost:3000')
    cy.contains('NEW BLOG TITLE 001').click()
    cy.get('#editBlogEdit').click()
    cy.get('#blogtitle').type('NEW BLOG TITLE 001 EDITED')
    cy.get('#blogbody').type('NEW BLOG BODY 001 EDITED')
    cy.get('#blogEditSave').click()
    cy.contains('NEW BLOG TITLE 001 EDITED')
    cy.contains('NEW BLOG BODY 001 EDITED')
  })

  it('should allow removing a post', function() {
    cy.visit('http://localhost:3000')
    cy.contains('NEW BLOG TITLE 001 EDITED').click()
    cy.get('#editBlogRemove').click()
    cy.get('nav').should('not.contain', 'NEW BLOG TITLE 001 EDITED')
    cy.get('nav').should('not.contain', 'NEW BLOG BODY 001 EDITED')
  })

  it('should allow selecting a post', function() {
    cy.visit('http://localhost:3000')
    cy.get('#newPost').click()
    cy.get('#blogtitle').type('select title 001')
    cy.get('#blogbody').type('select body 001')
    cy.get('#blogEditSave').click()
    cy.get('nav').should('contain', 'select title 001')

    cy.get('#newPost').click()
    cy.get('#blogtitle').type('select title 002')
    cy.get('#blogbody').type('select body 002')
    cy.get('#blogEditSave').click()
    cy.get('nav').should('contain', 'select title 002')

    cy.contains('select title 001').click()
    cy.get('main').should('contain', 'select title 001')
    cy.get('main').should('contain', 'select body 001')

    cy.contains('select title 002').click()
    cy.get('main').should('contain', 'select title 002')
    cy.get('main').should('contain', 'select body 002')

  })

})
