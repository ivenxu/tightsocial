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
package org.tightsocial.common.infrastructure.persistence;

import java.lang.reflect.ParameterizedType;
import javax.persistence.EntityManager;
import org.tightsocial.common.domain.Entity;
import org.tightsocial.common.domain.EntityNotExistException;


/**
 *
 * @author Iven Xu <ivenxu at gmail.com>
 * @param <T>
 */
public abstract class AbstractRepository<T extends Entity> implements Repository<T> {
       
    {
        initClassT();
    }
    
    @Override
    public T ofId(long id)  throws EntityNotExistException{
        try{
            T entity = mainEnityManager().find(classT, id);
            if (entity != null){
                return entity;
            } else {
                throw new EntityNotExistException(classT.getClass(), id);
            }
        } catch (IllegalArgumentException iae){
            throw new EntityNotExistException(classT.getClass(), id);
        }
    }

    @Override
    public void add(T aUser) {
        mainEnityManager().persist(aUser);
    }
        
    protected abstract EntityManager mainEnityManager();
    
    @SuppressWarnings("unchecked")
    protected void initClassT(){
        Class<?> directSubClass = findParameterInstantiateClass(this.getClass());
        classT = (Class<T>) ((ParameterizedType)directSubClass.getGenericSuperclass()).getActualTypeArguments()[0];
    }
    
    private Class<?> findParameterInstantiateClass(Class<?> aClass){ 
        Class<?> superClass = aClass.getSuperclass();
        
        if (superClass.getTypeParameters() != null && superClass.getTypeParameters().length > 0){
            return aClass;
        } else {
            return findParameterInstantiateClass(superClass);
        }
    }
    
       
    Class<T> classT;
}
