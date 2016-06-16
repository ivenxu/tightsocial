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
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import javax.enterprise.inject.Typed;
import org.tightsocial.identification.model.Tenant;
import org.tightsocial.identification.model.TenantRepository;

/**
 *
 * @author Iven Xu <ivenxu at gmail.com>
 */
@Typed
public class TenantMockRepository extends TenantDBRepository implements TenantRepository {
    private final Map<Long, Tenant> store;
    
    public TenantMockRepository(){
        store = new HashMap<>();
    }
    @Override
    public Tenant ofId(long id){
        return store.get(id);
    }
    
    @Override
    public void add(Tenant aTenant){
        store.put(aTenant.getId(), aTenant);
    }
    
     @Override
    public List<Tenant> createdBy(long userId) {
        return this.store.values().stream().filter(u->null != u.getCreator() && u.getCreator().getId() == userId).collect(Collectors.toList());
    }
    
    public Map<Long, Tenant> getStore(){
        return store;
    }
}
