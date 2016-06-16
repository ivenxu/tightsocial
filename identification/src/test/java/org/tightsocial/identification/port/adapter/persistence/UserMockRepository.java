/*
 * The MIT License
 *
 * Copyright 2016 tightsocial.org.
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

import java.util.HashMap;
import java.util.Map;
import javax.enterprise.inject.Typed;
import org.tightsocial.common.domain.EntityNotExistException;
import org.tightsocial.identification.model.LoginCredential;
import org.tightsocial.identification.model.ModelLoginType;
import org.tightsocial.identification.model.User;
import org.tightsocial.identification.model.UserRepository;


/**
 *
 * @author Iven Xu <ivenxu at gmail.com>
 */
@Typed
public class UserMockRepository extends UserDBRepository implements UserRepository {
    private final Map<Long, User> store;
    
    public UserMockRepository(){
        store = new HashMap<>();
    }
    
    public Map<Long, User> getStore(){
        return store;
    }
    
    @Override
    public User ofId(long id){
        return store.get(id);
    }
    
    @Override
    public void add(User aUser){
        store.put(aUser.getId(), aUser);
    }

    @Override
    public User byCredentialIDAndType(String identifier, ModelLoginType loginType) throws EntityNotExistException{
        for (User u : this.store.values()){
            if (u.credentials().containsKey(loginType)){
                LoginCredential sl = u.credentials().get(loginType);
                if (sl.getIdentifier().equals(identifier)){
                    return u;
                }
            }
        }
        throw new EntityNotExistException(User.class);
    }
}
