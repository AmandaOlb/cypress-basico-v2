
/// <reference types="Cypress" />
/// Exercícios da Aula 02 - Curso de Testes automatizados com Cypress - Básico


describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html') //antes de cada teste, visita a aplicação
    })
/// Exercício e exercício extra 01
    it('verifica o título da aplicação', function(){
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin laoreet auctor semper. Praesent eros neque, bibendum et eros quis, euismod varius nunc. In rhoncus rutrum lacus eget hendrerit. Suspendisse consectetur cursus leo nec luctus. Morbi quis quam eget lorem faucibus auctor sed et lectus. Cras nec nulla non arcu finibus porta vel a lorem. Phasellus.'
        cy.get('#firstName').should('be.visible').type('Amanda')
        cy.get('[id=lastName]').should('be.visible').type('Rocha')
        cy.get('[id=email]').should('be.visible').type('amanda@123.com')
        cy.get('[id=product]').select('cursos')
        cy.get('#open-text-area').type(longText, {delay : 0})
        cy.get('.button').click()
        cy.get('.success').should('be.visible')
    })

/// Exercício extra 02  e 03
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').should('be.visible').type('Amanda')
        cy.get('#lastName').should('be.visible').type('Rocha')
        cy.get('#email').should('be.visible').type('amanda@123')
        cy.get('#phone').type('aaaaa').should('be.empty')
        cy.get('#product').select('cursos')
        cy.get('#open-text-area').type("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin laoreet auctor semper. Praesent eros neque, bibendum et eros quis, euismod varius nunc. In rhoncus rutrum lacus eget hendrerit. Suspendisse consectetur cursus leo nec luctus. Morbi quis quam eget lorem faucibus auctor sed et lectus. Cras nec nulla non arcu finibus porta vel a lorem. Phasellus.", {delay : 0})
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    })
 
    /// Exercício extra 04 
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Amanda')
        cy.get('#lastName').type('Rocha')
        cy.get('#email').type('amanda@123.com')
        cy.get('#product').select('cursos')
        cy.get('#open-text-area').type("Lorem ipsum dolor sit amet, conse")
        cy.get('#phone-checkbox').check()
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    }) 

    /// Exercício extra 05
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName').type('Amanda').should('have.value', 'Amanda')
        cy.get('#lastName').type('Rocha').should('have.value', 'Rocha')
        cy.get('#email').type('amanda@123.com').should('have.value', 'amanda@123.com')
        cy.get('#product').select('cursos')
        cy.get('#open-text-area').type("texto grande para preencher").should('have.value', "texto grande para preencher")
        cy.get('#firstName').clear().should('have.value', '')
        cy.get('#lastName').clear().should('have.value', '')
        cy.get('#email').clear().should('have.value', '')
        cy.get('#open-text-area').clear().should('have.value', '')
    })

    /// Exercício extra 06
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    })

    /// Exercício extra 07
    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit();
    })

    //Aula 03 - Exercício 01
    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor', function(){
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    //Aula 04
    it('marca o tipo de atendimento "Feedback"',function(){
        cy.get('[type="radio"]').check('feedback').should('have.value', 'feedback')
    })
    
    it('marca cada tipo de atendimento', function(){
        
        /* cy.get('[type="radio"]').check('ajuda').should('be.checked')
        cy.get('[type="radio"]').check('elogio').should('be.checked')
        cy.get('[type="radio"]').check('feedback').should('be.checked')
 */
        cy.get('[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    //Aula 05
    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('[type="checkbox"]').as('checkboxes').check()
       /// cy.get('[type="checkboxes"]').last().uncheck()
    })


})
