/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.tightsocial.feedbackgleaning.port.adapter.persistence;

import java.io.Serializable;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.tightsocial.feedbackgleaning.model.Form;
import org.tightsocial.feedbackgleaning.model.FormRepository;
import org.tightsocial.feedbackgleaning.model.NewEntity;

/**
 *
 * @author Iven Xu <ivenxu at gmail.com>
 */
@Named
@ApplicationScoped
public class DatabaseFormRepository implements FormRepository, Serializable {
    private static final long serialVersionUID = 6328735739559478739L;
    
    @PersistenceContext(unitName="feedbackGleaning")
    private EntityManager em;
    
    @Override
    public Form ofId(long id) {
        return em.find(Form.class, id);
    }

    @Override
    public void save(Form aForm) {
        em.persist(aForm);
    }
    
}
