/*
 * The MIT License
 *
 * Copyright 2015 tightsocial.org.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
package org.tightsocial.identification.port.adapter.persistence;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.NoResultException;
import javax.persistence.TypedQuery;
import org.tightsocial.common.domain.EntityNotExistException;
import org.tightsocial.identification.model.ModelLoginType;
import org.tightsocial.identification.model.User;
import org.tightsocial.identification.model.UserRepository;

/**
 *
 * @author Iven Xu <ivenxu at gmail.com>
 */
@ApplicationScoped
public class UserDBRepository extends IdentificationAbstractRepository<User> implements UserRepository {

    @Override
    public User byCredentialIDAndType(String identifier, ModelLoginType loginType) throws EntityNotExistException {
        TypedQuery<User> tq = this.mainEnityManager().createNamedQuery("findUserByCredentialIDAndType", User.class);
        tq.setParameter("identifier", identifier);
        tq.setParameter("loginType", loginType);
        try{
            return tq.getSingleResult();
        } catch (NoResultException nre){
            throw new EntityNotExistException(User.class);
        }
    }
    
    
}
